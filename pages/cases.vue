<template>
  <section class="section">
    <div class="card">
      <div class="card-content">
        <p class="card-title">COVID19 cases in Philippines</p>
        <div class="is-spacer-sm"></div>
        <div class="is-spacer-sm"></div>
        <!-- Begin table -->
        <b-table
          :data="caseReports"
          :loading="isLoading"
          :paginated="true"
          backend-pagination
          :hoverable="true"
          :total="total"
          :per-page="perPage"
          @page-change="onPageChange"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <template slot-scope="props">
            <b-table-column field="CaseCode" label="Case No.">{{ props.row.CaseCode }}</b-table-column>
            <b-table-column field="DateRepConf" label="Date confirmed">{{ props.row.DateRepConf }}</b-table-column>
            <b-table-column field="Age" label="Age" sortable>{{ props.row.Age }}</b-table-column>
            <b-table-column field="Sex" label="Gender">{{ props.row.Sex }}</b-table-column>
            <b-table-column field="RegionRes" label="Region" searchable>{{ props.row.RegionRes }}</b-table-column>
            <b-table-column field="ProvCityRes" label="Province" searchable>
              <span v-html="props.row.ProvCityRes"></span>
            </b-table-column>
            <b-table-column
              field="RemovalType"
              label="Status"
              :class="statType(props.row.RemovalType)"
            >{{ ((props.row.RemovalType.length > 0) ? props.row.RemovalType : '-') }}</b-table-column>
          </template>
        </b-table>
        <!-- End table -->
        <small class="has-text-body">
          Source:
          <a
            href="https://ncovtracker.doh.gov.ph/"
            class="has-text-body"
          >Department of Health Philippines</a>
        </small>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Case-reports',
  head() {
    return {
      title: 'Cases'
    }
  },
  data() {
    return {
      caseReports: [],
      total: 0,
      page: 1,
      perPage: 20,
      isLoading: false
    }
  },
  mounted() {
    this.loadFromDb()
  },
  methods: {
    async loadFromDb() {
      this.isLoading = true
      const messageRef = this.$fireDb.ref('cases')
      try {
        const snapshot = await messageRef.once('value')

        this.caseReports = []
        let currentTotal = snapshot.val().length
        if (currentTotal / this.perPage > 1000) {
          currentTotal = this.perPage * 1000
        }
        this.total = currentTotal
        let sortedCases = snapshot.val()
        // .sort(
        //   (a, b) =>
        //     new Date(a.DateRepConf).getDate() -
        //     new Date(b.DateRepConf).getDate()
        // )
        this.caseReports = sortedCases
        this.isLoading = false
      } catch (error) {
        error({ statusCode: 404, message: 'Something went wrong' })
      }
    },
    onPageChange(page) {
      this.page = page
      this.loadFromDb()
    },
    statType(string) {
      if (string === 'Recovered') {
        return 'has-text-green'
      } else if (string === 'Died') {
        return 'has-text-red'
      }
    }
  }
}
</script>
