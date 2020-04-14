<template>
  <div class="container">
    <ChartBar
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
      :width="width"
      :height="height"
    />
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
    Axios.get(`https://coronavirus-ph-api.herokuapp.com/cases`)
      .then(response => {
        const responseData = response.data
        const childAges = responseData
          .map(item => item.age)
          .filter(age => age < 18).length
        const youngAges = responseData
          .map(item => item.age)
          .filter(age => (age = 18 && age <= 30)).length
        const midAges = responseData
          .map(item => item.age)
          .filter(age => (age = 31 && age <= 45)).length
        const oldAges = responseData
          .map(item => item.age)
          .filter(age => age > 46).length
        this.chartData = {
          labels: ['0-17', '18-30', '31-45', '46+'],
          datasets: [
            {
              barPercentage: 0.5,
              categoryPercentage: 1.0,
              type: 'horizontalBar',
              backgroundColor: '#FD413C',
              data: [childAges, youngAges, midAges, oldAges]
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
    isChild(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx)
    }
  }
}
</script>
