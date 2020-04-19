<template>
  <div class="container">
    <ChartBar
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
      :width="width"
      :height="height"
    />
    <small class="has-text-body">
      Source:
      <a href="https://www.doh.gov.ph/covid-19/case-tracker">DOH Philippines</a>
    </small>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      loaded: false,
      chartData: [],
      chartOptions: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
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
              }
            }
          ]
        },
        maintainAspectRatio: false,
        responsive: true
      },
      height: 200,
      width: 200
    }
  },
  async mounted() {
    this.loaded = false
    const messageRef = this.$fireDb.ref('cases')
    try {
      const snapshot = await messageRef.once('value')
      let result = snapshot.val()
      const group1 = []
      const group2 = []
      const group3 = []
      const group4 = []
      const group5 = []
      const group6 = []
      const group7 = []

      result.forEach(element => {
        // <19
        if (element.Age >= 0 && element.Age < 20) {
          group1.push(element)
        }
        // 20-29
        if (element.Age > 19 && element.Age < 30) {
          group2.push(element)
        }
        // 30-39
        if (element.Age >= 30 && element.Age < 40) {
          group3.push(element)
        }
        // 40-49
        if (element.Age >= 40 && element.Age < 50) {
          group4.push(element)
        }
        // 50-59
        if (element.Age >= 50 && element.Age < 60) {
          group5.push(element)
        }
        // 60-69
        if (element.Age >= 60 && element.Age < 70) {
          group6.push(element)
        }
        // <=70
        if (element.Age >= 70) {
          group7.push(element)
        }
      })

      this.chartData = {
        labels: ['<19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'],
        datasets: [
          {
            barPercentage: 0.5,
            categoryPercentage: 1.0,
            type: 'horizontalBar',
            backgroundColor: '#FEBC2C',
            outerGlowWidth: 2,
            outerGlowColor: '#FEBC2C',
            data: [
              group1.length,
              group2.length,
              group3.length,
              group4.length,
              group5.length,
              group6.length,
              group7.length
            ]
          }
        ]
      }

      this.loaded = true
    } catch (error) {
      return
    }
  }
}
</script>
