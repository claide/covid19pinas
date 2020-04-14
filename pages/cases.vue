<template>
  <section class="section">
    <SimpleCard title="COVID19 cases in Philippines">
      <!-- Begin selectbox -->
      <div class="is-spacer-sm"></div>
      <div class="columns">
        <b-field class="column is-full-mobile is-3-desktop">
          <b-select
            placeholder="Filter result"
            size="is-medium"
            expanded
            rounded
            v-model="selectedFilter"
          >
            <option value="all">All cases</option>
            <option value="regional">Regional cases</option>
            <option value="outside">Cases outside Philippines</option>
          </b-select>
        </b-field>
      </div>
      <!-- End selectbox -->
      <div class="is-spacer-sm"></div>
      <b-table
        v-show="selectedFilter === 'all'"
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
          <b-table-column field="case_no" label="Case #" sortable>{{ props.row.case_no }}</b-table-column>
          <b-table-column
            field="date"
            label="Date"
            sortable
          >{{ props.row.date | moment("MMMM DD, YYYY") }}</b-table-column>
          <b-table-column field="age" label="Age" sortable>{{ props.row.age }}</b-table-column>
          <b-table-column field="gender" label="Gender" sortable>{{ props.row.gender }}</b-table-column>
          <b-table-column
            field="nationality"
            label="Nationality"
            :searchable="true"
          >{{ props.row.nationality }}</b-table-column>
          <b-table-column
            field="hospital_admitted_to"
            label="Admitted to"
            :searchable="true"
          >{{ props.row.hospital_admitted_to }}</b-table-column>
          <b-table-column
            field="travel_history"
            label="Travel History"
          >{{ props.row.travel_history }}</b-table-column>
          <b-table-column field="status" label="Status" :class="statType(props.row.status)">
            <span class="is-size-6">{{ props.row.status }}</span>
          </b-table-column>
        </template>
      </b-table>
      <CaseOutside v-show="selectedFilter === 'outside'" />
      <CaseRegional v-show="selectedFilter === 'regional'" />
    </SimpleCard>
  </section>
</template>

<script>
import Axios from 'axios'
import SimpleCard from '@/components/SimpleCard'
import CaseOutside from '@/components/CaseOutside'
import CaseRegional from '@/components/CaseRegional'

export default {
  name: 'Cases',
  head() {
    return {
      title: 'Cases'
    }
  },
  components: { SimpleCard, CaseOutside, CaseRegional },
  data() {
    return {
      selectedFilter: 'all',
      isLoading: false,
      tableData: [],
      total: 0,
      page: 1,
      perPage: 20
    }
  },
  methods: {
    loadAsyncData() {
      this.isLoading = true
      Axios.get(`https://coronavirus-ph-api.herokuapp.com/cases`).then(
        response => {
          this.tableData = []
          let currentTotal = response.data.length
          if (currentTotal / this.perPage > 1000) {
            currentTotal = this.perPage * 1000
          }
          this.total = currentTotal
          this.tableData = response.data
          this.isLoading = false
        }
      )
    },
    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    statType(string) {
      if (string === 'Recovered') {
        return 'has-text-green'
      } else if (string === 'Died') {
        return 'has-text-red'
      }
    }
  },
  mounted() {
    this.loadAsyncData()
  }
}
</script>
