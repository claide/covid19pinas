import Vue from 'vue'
import { Line, Doughnut, HorizontalBar, mixins } from 'vue-chartjs'

Vue.component('ChartLine', {
  mixins: [mixins.reactiveData],
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})

Vue.component('ChartDoughnut', {
  mixins: [mixins.reactiveData],
  extends: Doughnut,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})

Vue.component('ChartBar', {
  mixins: [mixins.reactiveData],
  extends: HorizontalBar,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
