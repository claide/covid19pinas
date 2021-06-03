<template>
  <section class="section">
    <div class="content">
      <h2 class="has-text-black">Philippines Overview</h2>
      <p>Last updated : {{ resultPh.updated_at | moment("dddd, MMMM Do YYYY hh:mm A") }}</p>
    </div>
    <div class="columns">
      <div class="is-spacer"></div>

      <div class="column is-9">
        <div class="columns is-variable is-3">
          <div class="column">
            <SimpleCard title="Confirmed">
              <h1 class="is-pulled-left">
                <ICountUp :delay="1000" :endVal="others.cases" :options="countOptions" />
              </h1>
              <p
                class="has-text-primary is-pulled-right"
                style="margin-top: 14px;"
              >{{ others.casesPerOneMillion }} cases / 1M</p>
              <div class="is-clearfix"></div>
              <p class="has-text-primary">
                <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                {{ resultPh.today.confirmed.toLocaleString() }} as of today
              </p>
            </SimpleCard>
          </div>

          <div class="column">
            <SimpleCard title="Deaths">
              <h1 class="is-pulled-left">
                <ICountUp :delay="1000" :endVal="others.deaths" :options="countOptions" />
              </h1>
              <p
                class="has-text-orange is-pulled-right"
                style="margin-top: 14px;"
              >( {{ resultPh.latest_data.calculated.death_rate.toFixed(2) }}% death rate)</p>
              <div class="is-clearfix"></div>
              <p class="has-text-orange">
                <b-icon icon="arrow-top-right" size="is-small"></b-icon>
                {{ resultPh.today.deaths.toLocaleString() }} as of today
              </p>
            </SimpleCard>
          </div>

          <div class="column">
            <SimpleCard title="Recovered">
              <h1 class="is-pulled-left">
                <ICountUp :delay="1000" :endVal="others.recovered" :options="countOptions" />
              </h1>

              <div class="is-clearfix"></div>
              <p
                class="has-text-green"
              >( {{ resultPh.latest_data.calculated.recovery_rate.toFixed(2) }}% recovery rate)</p>
            </SimpleCard>
          </div>
        </div>

        <div class="columns is-variable is-3">
          <div class="column">
            <SimpleCard title="Cases per Day">
              <div class="is-spacer-sm"></div>
              <chart />
            </SimpleCard>
          </div>
        </div>

        <div class="columns is-hidden-mobile">
          <div class="column">
            <regionalCases />
          </div>
        </div>
      </div>
      <div class="column">
        <SimpleCard>
          <ul class>
            <li class="has-text-grey flex">
              <div>Active Cases</div>
              <div class="has-text-black has-text-weight-bold">
                <ICountUp :delay="1000" :endVal="others.active" :options="countOptions" />
              </div>
            </li>
            <li class="has-text-grey flex">
              <div>Deaths / 1M</div>
              <div class="has-text-black has-text-weight-bold">
                <ICountUp
                  :delay="1000"
                  :endVal="others.deathsPerOneMillion"
                  :options="countOptions"
                />
              </div>
            </li>
            <li class="has-text-grey flex">
              <div>Total tests</div>
              <div class="has-text-black has-text-weight-bold">
                <ICountUp :delay="1000" :endVal="others.tests" :options="countOptions" />
              </div>
            </li>
            <li class="has-text-grey flex">
              <div>Tests / 1M</div>
              <div class="has-text-black has-text-weight-bold">
                <ICountUp
                  :delay="1000"
                  :endVal="others.testsPerOneMillion"
                  :options="countOptions"
                />
              </div>
            </li>
          </ul>
        </SimpleCard>
        <div class="is-spacer-xs"></div>
        <!-- <SimpleCard title="Cases by Gender">
          <div class="is-spacer-sm"></div>
          <ChartPie />
        </SimpleCard> -->
        <div class="is-spacer-xs"></div>
        <!-- <SimpleCard title="Cases by Age Group">
          <div class="is-spacer-sm"></div>
          <ChartBar />
        </SimpleCard> -->
        <div class="is-spacer-xs"></div>
        <SimpleCard title="Worldwide">
          <div class="is-spacer-sm"></div>
          <ul class>
            <li class="has-text-grey flex">
              <div>Confirmed</div>
              <div class="has-text-black has-text-weight-bold">
                <ICountUp :delay="1000" :endVal="resultGlobal.confirmed" :options="countOptions" />
              </div>
            </li>
            <li class="has-text-grey flex">
              <div>Deaths</div>
              <div class="has-text-black has-text-weight-bold">
                <ICountUp :delay="1000" :endVal="resultGlobal.deaths" :options="countOptions" />
              </div>
            </li>
            <li class="has-text-grey flex">
              <div>Recovered</div>
              <div class="has-text-black has-text-weight-bold">
                <ICountUp :delay="1000" :endVal="resultGlobal.recovered" :options="countOptions" />
              </div>
            </li>
          </ul>
        </SimpleCard>
      </div>
      <!-- <div class="column is-hidden-desktop">
        <regionalCases />
      </div> -->
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Card from '~/components/Card'
import SimpleCard from '~/components/SimpleCard'
import Chart from '~/components/Chart'
import ChartPie from '~/components/ChartPie'
import ChartBar from '~/components/ChartBar'
import ICountUp from 'vue-countup-v2'
// import regionalCases from '@/components/CaseRegional'

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
    ICountUp,
    // regionalCases
  },
  data() {
    return {
      resultPh: [],
      resultGlobal: [],
      errors: [],
      others: {},
      countOptions: {
        useEasing: true,
        useGrouping: true
      }
    }
  },
  async asyncData({ query, errors }) {
    // let [totalGlobal, infoPh, othersInfo] = await Promise.all([
    //   $axios.get(`https://corona-api.com/timeline`),
    //   $axios.get(`https://corona-api.com/countries/ph`),
    //   $axios.get('/api-ninja/countries/ph')
    // ])

    let [totalGlobal, infoPh, othersInfo] = await Promise.all([
      axios.get(`https://corona-api.com/timeline`),
      axios.get(`https://corona-api.com/countries/ph`),
      axios.get(`https://corona.lmao.ninja/v2/countries/ph`)
    ])
    return {
      resultGlobal: totalGlobal.data.data[0],
      resultPh: infoPh.data.data,
      others: othersInfo.data
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
