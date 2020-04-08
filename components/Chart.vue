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
                stepSize: 200
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
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
              backgroundColor: '#4d4dff',
              borderColor: '#4d4dff',
              pointRadius: 3,
              fill: false,
              data: responseData
                .map(timeline => timeline.new_confirmed)
                .filter(Number)
            },
            {
              label: 'Deaths',
              backgroundColor: '#FF4839',
              borderColor: '#FF4839',
              pointRadius: 3,
              fill: false,
              data: responseData
                .map(timeline => timeline.new_deaths)
                .filter(Number)
            },
            {
              label: 'Recovered',
              backgroundColor: '#01B075',
              borderColor: '#01B075',
              pointRadius: 3,
              fill: false,
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
