<template>
  <div class="container">
    <ChartLine v-if="loaded" :data="chartData" :options="chartOptions" :height="height" />
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'LineChartContainer',
  data() {
    return {
      loaded: false,
      chartData: [],
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 150
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 150
              },
              gridLines: {
                display: false
              },
              type: 'time',
              time: {
                displayFormats: {
                  quarter: 'MMM D'
                }
              }
            }
          ]
        },
        legend: {
          display: true,
          labels: {
            usePointStyle: true
          }
        },
        maintainAspectRatio: false
      },
      height: 350
    }
  },
  async mounted() {
    this.loaded = false
    Axios.get(`https://corona-api.com/countries/ph`)
      .then(response => {
        const responseData = response.data.data.timeline
        this.chartData = {
          labels: responseData.map(timeline => timeline.date),
          datasets: [
            {
              label: 'Confirmed',
              backgroundColor: '#FEBC2C',
              borderColor: '#FEBC2C',
              pointRadius: 0,
              fill: false,
              borderWidth: 2,
              pointHoverBorderWidth: 1,
              pointHoverRadius: 8,
              // showLine: false,
              data: responseData
                .map(timeline => timeline.new_confirmed)
                .filter(Number)
            },
            {
              label: 'Deaths',
              backgroundColor: '#FD413C',
              borderColor: '#FD413C',
              pointRadius: 0,
              fill: false,
              borderWidth: 2,
              pointHoverBorderWidth: 1,
              pointHoverRadius: 8,
              // showLine: false,
              data: responseData
                .map(timeline => timeline.new_deaths)
                .filter(Number)
            },
            {
              label: 'Recovered',
              backgroundColor: '#01B075',
              borderColor: '#01B075',
              pointRadius: 0,
              fill: false,
              borderWidth: 2,
              data: responseData
                .map(timeline => timeline.new_recovered)
                .filter(Number)
            }
          ]
        }
        this.loaded = true
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    chartStyle() {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  }
}
</script>
