<template>
  <div class="container">
    <ChartDoughnut
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
      :width="width"
      :height="height"
    />
    <br />
    <small class="has-text-grey">
      Source:
      <a
        class="has-text-grey"
        href="https://www.doh.gov.ph/covid-19/case-tracker"
      >DOH Philippines</a>
    </small>
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
            usePointStyle: true,
            boxWidth: 6
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
    const messageRef = this.$fireDb.ref('cases')
    try {
      const snapshot = await messageRef.once('value')
      let male = snapshot
        .val()
        .map(item => item.Sex)
        .filter(item => item == 'Male')
      let female = snapshot
        .val()
        .map(item => item.Sex)
        .filter(item => item == 'Female')
      let tba = snapshot
        .val()
        .map(item => item.Sex)
        .filter(item => item == '')

      this.chartData = {
        labels: ['Male', 'Female', 'TBA'],
        datasets: [
          {
            fill: true,
            borderWidth: '0px',
            backgroundColor: ['#713bdb', '#3bdb71', '#db713b'],
            data: [male.length, female.length, tba.length]
          }
        ]
      }
      this.loaded = true
    } catch (error) {
      error({ statusCode: 404, message: 'Something went wrong' })
    }
  }
}
</script>
