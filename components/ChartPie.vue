<template>
  <div class="container">
    <ChartDoughnut
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
  name: 'DoughnutChartContainer',
  data() {
    return {
      loaded: false,
      chartData: [],
      chartOptions: {
        cutoutPercentage: 80,
        legend: {
          display: true,
          position: 'right',
          labels: {
            usePointStyle: true
          }
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
        const male = responseData
          .map(item => item.gender)
          .filter(data => data == 'M')
        const female = responseData
          .map(item => item.gender)
          .filter(data => data == 'F')
        const unknown = responseData
          .map(item => item.gender)
          .filter(data => data == 'TBA')
        this.chartData = {
          labels: ['Male', 'Female', 'TBA'],
          datasets: [
            {
              fill: true,
              borderWidth: '1px',
              borderColor: '#202125',
              backgroundColor: ['#4d4dff', '#01B075', '#FF4839'],
              data: [male.length, female.length, unknown.length]
            }
          ]
        }
        this.loaded = true
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
