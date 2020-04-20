<template>
  <b-table :data="tableData">
    <template slot-scope="props">
      <b-table-column field="name" label="Region">{{ props.row.name }}</b-table-column>
      <b-table-column field="admitted" label="Currently admitted" sortable>{{ props.row.admitted }}</b-table-column>
      <b-table-column field="died" label="Deaths" sortable>{{ props.row.died }}</b-table-column>
      <b-table-column field="recovered" label="Recovered" sortable>{{ props.row.recovered }}</b-table-column>
      <b-table-column
        field="for_validation"
        label="For validation"
        sortable
      >{{ props.row.for_validation }}</b-table-column>
    </template>
  </b-table>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.loadDb()
  },
  methods: {
    async loadDb() {
      this.loading = true
      const messageRef = this.$fireDb.ref('cases')
      Axios.get(messageRef.toString() + '.json').then(response => {
        const data = response.data
        let ncr = data.filter(item => item.RegionRes === 'NCR').length
        let ilocos = data.filter(item => item.RegionRes === 'Ilocos').length
        let ilocosNorte = data.filter(item => item.RegionRes === 'San Fernando')
          .length
        console.log('ilocos :', ilocos)
      })
    }
  }
}
</script>
