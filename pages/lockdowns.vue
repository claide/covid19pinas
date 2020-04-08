<template>
  <section class="section">
    <SimpleCard title="Lockdown locations">
      <div class="is-spacer-sm"></div>
      <b-table
        :data="dataTable"
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
          <b-table-column field="lgu" label="LGU">{{ props.row.lgu }}</b-table-column>
          <b-table-column field="region" label="Region">{{ props.row.region }}</b-table-column>
          <b-table-column
            field="start_date"
            label="Date started"
            sortable
          >{{ props.row.start_date | moment("MMMM DD, YYYY") }}</b-table-column>
          <b-table-column
            field="estimated_population"
            label="Estimated population"
          >{{ props.row.estimated_population.toLocaleString() }}</b-table-column>
          <b-table-column field="cases" label="Cases" sortable>{{ props.row.cases }}</b-table-column>
          <b-table-column field="deaths" label="Deaths" sortable>{{ props.row.deaths }}</b-table-column>
          <b-table-column field="recovered" label="Recovered" sortable>{{ props.row.recovered }}</b-table-column>
        </template>
      </b-table>
    </SimpleCard>
  </section>
</template>

<script>
import SimpleCard from '@/components/SimpleCard'
import Axios from 'axios'
export default {
  name: 'Lockdowns',
  head() {
    return {
      title: 'Lockdowns'
    }
  },
  components: { SimpleCard },
  data() {
    return {
      dataTable: [],
      isLoading: false,
      total: 0,
      page: 1,
      perPage: 20
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.isLoading = true
      Axios.get(`https://coronavirus-ph-api.herokuapp.com/lockdowns`).then(
        response => {
          this.dataTable = []
          let currentTotal = response.data.length
          if (currentTotal / this.perPage > 1000) {
            currentTotal = this.perPage * 1000
          }
          this.total = currentTotal
          this.dataTable = response.data
          this.isLoading = false
        }
      )
    },
    onPageChange(page) {
      this.page = page
      this.loadData()
    }
  }
}
</script>
