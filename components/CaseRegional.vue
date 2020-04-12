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
import regionalData from 'static/regional.json'

export default {
  data() {
    return {
      tableData: regionalData
    }
  }
}
</script>
