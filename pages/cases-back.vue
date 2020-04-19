<template>
  <section class="section">
    <div v-html="table"></div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      table: ''
    }
  },
  async mounted() {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=parse&page=Template:2019%E2%80%9320_coronavirus_pandemic_data/Philippines_medical_cases&section=1&prop=text&format=json&origin=*`
      )
      .then(response => {
        const table = []
        let temp = response.data.parse.text
        let parent = document.getElementsByClassName('sortable')
        console.log('temp :', temp)
        let tData = document.querySelector('td')
        // parent.map(function() {
        //   return new Array(tData, this)
        //     .map(function() {
        //       return this.text()
        //     })
        //     .slice(2, 5)
        //     .get()
        // })
        // this.table = response.data.parse.text
      })
  }
}
</script>
