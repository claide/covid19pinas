<template>
  <div class="container">
    <ChartLine v-if="loaded" :data="chartData" :options="chartOptions" :height="height" />
  </div>
</template>

<script>
import Axios from 'axios'
import 'chartjs-plugin-style'

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
            usePointStyle: true,
            boxWidth: 6
          }
        },
        maintainAspectRatio: false,
        responsive: true
      },
      height: 249
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
              backgroundColor: '#713bdb',
              borderColor: '#713bdb',
              pointRadius: 0,
              fill: false,
              borderWidth: 2,
              pointHoverBorderWidth: 1,
              pointHoverRadius: 8,
              data: responseData
                .map(timeline => timeline.new_confirmed)
                .filter(Number)
            },
            {
              label: 'Deaths',
              backgroundColor: '#db713b',
              borderColor: '#db713b',
              pointRadius: 0,
              fill: false,
              borderWidth: 2,
              pointHoverBorderWidth: 1,
              pointHoverRadius: 8,
              data: responseData
                .map(timeline => timeline.new_deaths)
                .filter(Number)
            },
            {
              label: 'Recovered',
              backgroundColor: '#3bdb71',
              borderColor: '#3bdb71',
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
