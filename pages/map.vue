<template>
  <section class="section">
    <SimpleCard title="Map">
      <div class="is-spacer-sm"></div>
      <div id="map-wrap" style="height: 90vh">
        <no-ssr>
          <b-loading :active.sync="isLoading"></b-loading>
          <l-map :zoom="6" :center="[14.599512,120.984222]">
            <l-tile-layer :url="titleLayer"></l-tile-layer>
            <l-marker
              v-for="c in cases"
              :icon="icon"
              :key="c.case_no"
              :lat-lng="[c.latitude,c.longitude]"
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
            </l-marker>
          </l-map>
        </no-ssr>
      </div>
    </SimpleCard>
  </section>
</template>

<script>
import SimpleCard from '@/components/SimpleCard'
import Axios from 'axios'
let L = { icon() {} }
if (process.browser) L = require('leaflet')

export default {
  components: { SimpleCard },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      cases: [],
      titleLayer:
        'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
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
    // this.$nextTick(() => {
    //   this.markerObjects = this.$refs.markersRef.map(ref => ref.mapObject)
    // })
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
