<template>
  <b-table
    :data="tableData"
    :loading="isLoading"
    paginated
    :pagination-simple="true"
    backend-pagination
    :total="total"
    :per-page="perPage"
    @page-change="onPageChange"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  >
    <template slot-scope="props">
      <b-table-column
        field="country_territory_place"
        label="Territory"
      >{{ props.row.country_territory_place }}</b-table-column>
      <b-table-column field="confirmed" label="Confirmed" sortable>{{ props.row.confirmed }}</b-table-column>
      <b-table-column field="died" label="Deaths" sortable>{{ props.row.died }}</b-table-column>
      <b-table-column field="recovered" label="Recovered" sortable>{{ props.row.recovered }}</b-table-column>
    </template>
  </b-table>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'CasesOutside',
  data() {
    return {
      isLoading: false,
      tableData: [],
      total: 0,
      page: 1,
      perPage: 30
    }
  },
  methods: {
    loadAsyncData() {
      this.isLoading = true
      Axios.get(
        `https://coronavirus-ph-api.herokuapp.com/cases-outside-ph`
      ).then(response => {
        this.tableData = []
        let currentTotal = response.data.length
        if (currentTotal / this.perPage > 1000) {
          currentTotal = this.perPage * 1000
        }
        this.total = currentTotal
        this.tableData = response.data
        this.isLoading = false
      })
    },
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    statType(string) {
      if (string === 'Recovered') {
        return 'has-bg-green'
      } else if (string === 'Died') {
        return 'has-bg-red'
      }
    }
  },
  mounted() {
    this.loadAsyncData()
  }
}
</script>
