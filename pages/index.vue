<template>
  <div>
    <section class="section">
      <!-- <div class="notification has-bg-red">
        <button class="delete"></button>
        Code Red Sub-Level 2 has been raised by the Philippines over the COVID19 threat.
      </div>-->
      <div class="columns is-variable is-5">
        <div class="column is-3">
          <div class="content">
            <h2 class="has-text-body">Worldwide Status</h2>
            <p>Last updated : {{ resultGlobal.updated_at | moment("dddd, MMMM Do YYYY") }}</p>
          </div>
          <div class="is-spacer-sm"></div>
          <SimpleCard title="Coronavirus Cases">
            <div class="flex">
              <div class="flex-item">
                <h1>
                  <ICountUp :delay="1000" :endVal="resultGlobal.confirmed" :options="countOptions" />
                </h1>
                <p class="has-text-red">
                  <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                  {{ resultGlobal.new_confirmed.toLocaleString() }} as of today
                </p>
              </div>
              <div class="flex-item has-text-grey">
                <b-icon icon="hospital" size="is-large"></b-icon>
              </div>
            </div>
          </SimpleCard>
          <div class="is-spacer-sm"></div>
          <SimpleCard title="Deaths">
            <div class="flex">
              <div class="flex-item">
                <h1>
                  <ICountUp :delay="1000" :endVal="resultGlobal.deaths" :options="countOptions" />
                </h1>
                <p class="has-text-red">
                  <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                  {{ resultGlobal.new_deaths.toLocaleString() }} as of today
                </p>
              </div>
              <div class="flex-item has-text-grey">
                <b-icon icon="skull" size="is-large"></b-icon>
              </div>
            </div>
          </SimpleCard>
          <div class="is-spacer-sm"></div>
          <SimpleCard title="Recovered">
            <div class="flex">
              <div class="flex-item">
                <h1>
                  <ICountUp :delay="1000" :endVal="resultGlobal.recovered" :options="countOptions" />
                </h1>
                <p class="has-text-green">
                  <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                  {{ resultGlobal.new_recovered.toLocaleString() }} as of today
                </p>
              </div>
              <div class="flex-item has-text-grey">
                <b-icon icon="cards-heart" size="is-large"></b-icon>
              </div>
            </div>
          </SimpleCard>
        </div>
        <div class="is-spacer"></div>

        <div class="column">
          <div class="content">
            <h2 class="has-text-body">Philippines Overview</h2>
            <p>Last updated : {{ resultPh.updated_at | moment("dddd, MMMM Do YYYY") }}</p>
          </div>
          <div class="is-spacer-sm"></div>
          <div class="columns columns is-variable is-3">
            <div class="column">
              <div class="card">
                <div class="card-content">
                  <div class="columns">
                    <div class="column">
                      <div class="content">
                        <p class="card-title is-marginless">Confirmed Cases</p>
                        <h1>
                          <ICountUp
                            :delay="1000"
                            :endVal="resultPh.latest_data.confirmed"
                            :options="countOptions"
                          />
                        </h1>
                        <p class="has-text-red">
                          <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                          {{ resultPh.today.confirmed.toLocaleString() }} as of today
                        </p>
                      </div>
                    </div>
                    <div class="is-divider-vertical"></div>
                    <div class="column">
                      <div class="content">
                        <p class="card-title is-marginless">Deaths</p>
                        <h1 class="is-pulled-left">
                          <ICountUp
                            :delay="1000"
                            :endVal="resultPh.latest_data.deaths"
                            :options="countOptions"
                          />
                        </h1>
                        <p
                          class="has-text-red is-pulled-right"
                          style="margin-top: 14px;"
                        >( {{ resultPh.latest_data.calculated.death_rate.toFixed(2) }}% death rate)</p>
                        <div class="is-clearfix"></div>
                        <p class="has-text-red">
                          <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                          {{ resultPh.today.deaths.toLocaleString() }} as of today
                        </p>
                      </div>
                    </div>
                    <div class="is-divider-vertical"></div>
                    <div class="column">
                      <div class="content">
                        <p class="card-title is-marginless">Recovered</p>
                        <h1 class="is-pulled-left">
                          <ICountUp
                            :delay="1000"
                            :endVal="resultPh.latest_data.recovered"
                            :options="countOptions"
                          />
                        </h1>
                        <p
                          class="has-text-green is-pulled-right"
                          style="margin-top: 14px;"
                        >( {{ resultPh.latest_data.calculated.recovery_rate.toFixed(2) }}% recovery rate)</p>
                        <div class="is-clearfix"></div>
                        <p v-if="resultPh.today.recovered" class="has-text-green">
                          <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                          {{ resultPh.today.recovered.toLocaleString() }} as of today
                        </p>
                        <p v-else class="has-text-green">
                          <b-icon icon="arrow-right" size="is-small"></b-icon>0 as of today
                        </p>
                      </div>
                    </div>
                    <div class="is-divider-vertical"></div>
                    <div class="column">
                      <div class="content">
                        <ul class>
                          <li class="has-text-grey flex">
                            <div>PUIs</div>
                            <div>{{ monitoring.pui.toLocaleString() }}</div>
                          </li>
                          <li class="has-text-grey flex">
                            <div>Total tested</div>
                            <div>{{ monitoring.totalTested.toLocaleString() }}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-variable is-4">
            <div class="column is-6">
              <SimpleCard title="Cases per day">
                <div class="is-spacer-sm"></div>
                <chart />
              </SimpleCard>
            </div>
            <div class="column is-3">
              <SimpleCard title="Cases by gender">
                <div class="is-spacer-sm"></div>
                <ChartPie />
              </SimpleCard>
            </div>
            <div class="column is-3">
              <SimpleCard title="Cases by age">
                <div class="is-spacer-sm"></div>
                <ChartBar />
              </SimpleCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '~/components/Card'
import SimpleCard from '~/components/SimpleCard'
import Chart from '~/components/Chart'
import ChartPie from '~/components/ChartPie'
import ChartBar from '~/components/ChartBar'
import ICountUp from 'vue-countup-v2'

export default {
  name: 'HomePage',
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Tracks current COVID19 cases and history in the Philippines'
        }
      ]
    }
  },
  components: {
    Card,
    SimpleCard,
    Chart,
    ChartPie,
    ChartBar,
    ICountUp
  },
  data() {
    return {
      resultPh: [],
      resultGlobal: [],
      errors: [],
      puis: 0,
      monitoring: {
        pui: 1441,
        totalTested: 5974
      },
      countOptions: {
        useEasing: true,
        useGrouping: true
      }
    }
  },
  async asyncData({ query, error }) {
    let [totalGlobal, infoPh, puiTotal] = await Promise.all([
      axios.get(`https://corona-api.com/timeline`),
      axios.get(`https://corona-api.com/countries/ph`),
      axios.get(`https://coronavirus-ph-api.herokuapp.com/facilities`)
    ])
    return {
      resultGlobal: totalGlobal.data.data[0],
      resultPh: infoPh.data.data,
      puis: puiTotal.data.map(item => item.puis).reduce((a, b) => a + b, 0)
    }
  },
  filters: {
    getPercentage(value, decimals) {
      if (!value) {
        value = 0
      }
      if (!decimals) {
        decimals = 0
      }
      value = value * 100
      value =
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
      value = value + '%'
      return value
    }
  },
  methods: {
    formatThousand(value) {
      return value.toLocaleString()
    }
  }
}
</script>
