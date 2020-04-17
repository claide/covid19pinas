<template>
  <section class="section">
    <SimpleCard title="Map">
      <div class="is-spacer-sm"></div>
      <div id="map-wrap">
        <client-only>
          <l-map :zoom="6.21" :center="[11.5029379,121.805921]" style="height: 100%">
            <l-tile-layer :url="titleLayer" :attribution="attribution"></l-tile-layer>
            <l-circle
              v-for="c in cases"
              :key="c.case_no"
              :lat-lng="[c.latitude,c.longitude]"
              :radius="circle.radius"
              :color="circle.color"
              :fillColor="circle.fill"
            >
              <l-popup
                :content="('<table><tr><td>Age : ' + c.age.toString() + '</td></tr>' +
                '<tr><td>Date : ' + c.date + '</td></tr><tr><td>Gender : ' + c.gender + '</td></tr>' +
                '<tr><td>Nationality : ' + c.nationality + '</td></tr>' +
                '<tr><td>Admitted to : ' + c.hospital_admitted_to + '</td></tr>' +
                '<tr><td>Resident : ' + c.resident_of + '</td></tr>' +
                '<tr><td>Status : ' + c.status + '</td></tr>' +
                '<tr><td>Travel history : ' + c.travel_history + '</td></tr></table>'
                )"
              />
            </l-circle>
          </l-map>
        </client-only>
      </div>
    </SimpleCard>
  </section>
</template>

<script>
import SimpleCard from '@/components/SimpleCard'
import Axios from 'axios'
import L from 'leaflet'

export default {
  name: 'Map',
  head() {
    return {
      title: 'Map'
    }
  },
  components: { SimpleCard },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      cases: [],
      results: [],
      titleLayer:
        'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=d9f72db70af14b5f9dd32de67fefadea',
      attribution:
        'Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      circle: {
        radius: 30000,
        color: '#FD413C',
        fill: '#FD413C'
      },
      icon: L.icon({
        iconUrl: require('~/assets/img/dot.png'),
        iconSize: [40, 40],
        iconAnchor: [21, 35],
        popupAnchor: [-3, -76]
      })
    }
  },
  mounted() {
    this.getCases()
    this.getData()
  },
  methods: {
    getCases() {
      this.isLoading = true
      Axios.get(`https://coronavirus-ph-api.herokuapp.com/cases`).then(
        response => {
          this.cases = response.data.filter(item => item.latitude != 'TBA')
          this.isLoading = false
        }
      )
    },
    getData() {
      Axios.get(
        `https://${process.env.PROJECT_ID}.firebaseio.com/cases.json?auth=${process.env.DATABASE_SECRET}`
      ).then(response => {
        this.results = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#map-wrap {
  .vue2leaflet-map {
    z-index: 1;
  }
}

.leaflet-popup-content {
  table td {
    font-size: 16px !important;
  }
}
</style>
