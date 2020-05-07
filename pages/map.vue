<template>
  <section class="section">
    <SimpleCard title="Map">
      <div class="is-spacer-sm"></div>
      <div class="map-container">
        <GMap
          ref="gMap"
          :center="mapCenter"
          :options="{fullscreenControl: false, disableDefaultUI: true, styles: mapStyle}"
          :zoom="6"
          scaleControl="false"
        >
          <GMapMarker
            v-for="region in regions"
            :key="region.name"
            :position="{lat: region.position.lat, lng: region.position.lng}"
            :options="{icon: pin}"
            @click="currentLocation = region"
          >
            <GMapInfoWindow>
              <p class="has-text-weight-bold has-text-black">{{ region.name }}</p>
              <ul>
                <li class="has-text-black">
                  Confirmed:
                  <span class="has-text-weight-bold">{{ region.confirmed }}</span>
                </li>
                <li class="has-text-black">
                  Recovered:
                  <span class="has-text-weight-bold">{{ region.recovered }}</span>
                </li>
                <li class="has-text-black">
                  Deaths:
                  <span class="has-text-weight-bold">{{ region.deaths }}</span>
                </li>
              </ul>
            </GMapInfoWindow>
          </GMapMarker>
        </GMap>
      </div>
    </SimpleCard>
  </section>
</template>

<script>
import Axios from 'axios'
import SimpleCard from '@/components/SimpleCard'

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
      currentLocation: {},
      mapCenter: { lat: 11.9934097, lng: 121.5256785 },
      regions: [],
      pin: '/marker.png',
      mapStyle: [
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'transit',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.loadDb()
  },
  updated() {
    this.$refs.gMap.initMarkers()
  },
  methods: {
    async loadDb() {
      const messageRef = this.$fireDb.ref('cases')
      Axios.get(messageRef.toString() + '.json').then(response => {
        const data = response.data

        // regions
        let ncr = data.filter(
          item =>
            item.RegionRes === 'NCR' ||
            item.RegionRes === 'Caloocan City (North)' ||
            item.RegionRes === 'Caloocan City (South)' ||
            item.RegionRes === 'Las Piñas' ||
            item.RegionRes === 'Makati' ||
            item.RegionRes === 'Malabon' ||
            item.RegionRes === 'Mandaluyong' ||
            item.RegionRes === 'Manila' ||
            item.RegionRes === 'Marikina' ||
            item.RegionRes === 'Muntinlupa' ||
            item.RegionRes === 'Navotas' ||
            item.RegionRes === 'Parañaque' ||
            item.RegionRes === 'Pasay City' ||
            item.RegionRes === 'Pasig' ||
            item.RegionRes === 'Pateros' ||
            item.RegionRes === 'Quezon City (districts/streets)' ||
            item.RegionRes === 'Quezon City (postal codes)' ||
            item.RegionRes === 'San Juan' ||
            item.RegionRes === 'Taguig' ||
            item.RegionRes === 'Valenzuela'
        )

        let ilocos = data.filter(
          item =>
            item.RegionRes === 'Region I: Ilocos Region' ||
            item.RegionRes === 'Ilocos' ||
            item.RegionRes === 'For Validation' ||
            item.RegionRes === 'Dagupan City' ||
            item.RegionRes === 'Ilocos Norte' ||
            item.RegionRes === 'Ilocos Sur' ||
            item.RegionRes === 'La Union' ||
            item.RegionRes === 'Pangasinan' ||
            item.RegionRes === 'Alaminos' ||
            item.RegionRes === 'Batac' ||
            item.RegionRes === 'Candon' ||
            item.RegionRes === 'San Carlos' ||
            item.RegionRes === 'San Fernando' ||
            item.RegionRes === 'Laoag City' ||
            item.RegionRes === 'Lingayen' ||
            item.RegionRes === 'Urdaneta' ||
            item.RegionRes === 'Vigan'
        )
        let car = data.filter(
          item =>
            item.RegionRes === 'CAR' ||
            item.RegionRes === 'Abra' ||
            item.RegionRes === 'Apayao' ||
            item.RegionRes === 'Benguet' ||
            item.RegionRes === 'Ifugao' ||
            item.RegionRes === 'Kalinga' ||
            item.RegionRes === 'Baguio City' ||
            item.RegionRes === 'Mountain Province'
        )
        let cagayanValley = data.filter(
          item =>
            item.RegionRes === 'Region II: Cagayan Valley' ||
            item.RegionRes === '2' ||
            item.RegionRes === 'Batanes' ||
            item.RegionRes === 'Cagayan' ||
            item.RegionRes === 'Isabela' ||
            item.RegionRes === 'Nueva Vizcaya' ||
            item.RegionRes === 'Quirino'
        )
        let centralLuzon = data.filter(
          item =>
            item.RegionRes === '3' ||
            item.RegionRes === 'Region III: Central Luzon' ||
            item.RegionRes === 'Angeles City' ||
            item.RegionRes === 'Aurora' ||
            item.RegionRes === 'Bataan' ||
            item.RegionRes === 'Bulacan' ||
            item.RegionRes === 'Nueva Ecija' ||
            item.RegionRes === 'Olongapo City' ||
            item.RegionRes === 'Pampanga' ||
            item.RegionRes === 'Tarlac' ||
            item.RegionRes === 'Zambales'
        )
        let calabarzon = data.filter(
          item =>
            item.RegionRes === 'Region IV-A: CALABARZON' ||
            item.RegionRes === '4A' ||
            item.RegionRes === 'Batangas' ||
            item.RegionRes === 'Cavite' ||
            item.RegionRes === 'Laguna' ||
            item.RegionRes === 'Quezon' ||
            item.RegionRes === 'Rizal' ||
            item.RegionRes === 'Lucena'
        )
        let mimaropa = data.filter(
          item =>
            item.RegionRes === 'Region IV-B: MIMAROPA' ||
            item.RegionRes === '4B' ||
            item.RegionRes === 'Marinduque' ||
            item.RegionRes === 'Occidental Mindoro' ||
            item.RegionRes === 'Oriental Mindoro' ||
            item.RegionRes === 'Palawan' ||
            item.RegionRes === 'Romblon' ||
            item.RegionRes === 'Puerto Princesa'
        )
        let bicol = data.filter(
          item =>
            item.RegionRes === 'Region V: Bicol Region' ||
            item.RegionRes === '5' ||
            item.RegionRes === 'Bicol' ||
            item.RegionRes === 'Albay' ||
            item.RegionRes === 'Camarines Norte' ||
            item.RegionRes === 'Camarines Sur' ||
            item.RegionRes === 'Catanduanes' ||
            item.RegionRes === 'Masbate' ||
            item.RegionRes === 'Sorsogon' ||
            item.RegionRes === 'Naga City'
        )
        let westernVisayas = data.filter(
          item =>
            item.RegionRes === 'Region VI: Western Visayas' ||
            item.RegionRes === '6' ||
            item.RegionRes === 'Western Visayas' ||
            item.RegionRes === 'Aklan' ||
            item.RegionRes === 'Antique' ||
            item.RegionRes === 'Capiz' ||
            item.RegionRes === 'Guimaras' ||
            item.RegionRes === 'Iloilo' ||
            item.RegionRes === 'Bacolod City' ||
            item.RegionRes === 'Iloilo City' ||
            item.RegionRes === 'Negros Occidental'
        )
        let centralVisayas = data.filter(
          item =>
            item.RegionRes === 'Region VII: Central Visayas' ||
            item.RegionRes === '7' ||
            item.RegionRes === 'Central Visayas' ||
            item.RegionRes === 'Bohol' ||
            item.RegionRes === 'Cebu' ||
            item.RegionRes === 'Mandaue City' ||
            item.RegionRes === 'Negros Oriental' ||
            item.RegionRes === 'Siquijor' ||
            item.RegionRes === 'Cebu City' ||
            item.RegionRes === 'Lapu-Lapu'
        )
        let easternVisayas = data.filter(
          item =>
            item.RegionRes === 'Region VIII: Eastern Visayas' ||
            item.RegionRes === '8' ||
            item.RegionRes === 'Biliran' ||
            item.RegionRes === 'Leyte' ||
            item.RegionRes === 'Northern Samar' ||
            item.RegionRes === 'Samar (Western Samar)' ||
            item.RegionRes === 'Samar' ||
            item.RegionRes === 'Eastern Samar' ||
            item.RegionRes === 'Southern Leyte' ||
            item.RegionRes === 'Tacloban'
        )
        let zamboangaPeninsula = data.filter(
          item =>
            item.RegionRes === 'Region IX: Zamboanga Peninsula' ||
            item.RegionRes === '9' ||
            item.RegionRes === 'Zamboanga Peninsula' ||
            item.RegionRes === 'Zamboanga City' ||
            item.RegionRes === 'Zamboanga del Norte' ||
            item.RegionRes === 'Zamboanga Sibugay' ||
            item.RegionRes === 'Zamboanga del Sur'
        )
        let northernMindanao = data.filter(
          item =>
            item.RegionRes === 'Region X: Northern Mindanao' ||
            item.RegionRes === '10' ||
            item.RegionRes === 'Northern Mindanao' ||
            item.RegionRes === 'Bukidnon' ||
            item.RegionRes === 'Camiguin' ||
            item.RegionRes === 'Iligan City' ||
            item.RegionRes === 'Lanao del Norte' ||
            item.RegionRes === 'Misamis Occidental' ||
            item.RegionRes === 'Misamis Oriental' ||
            item.RegionRes === 'Cagayan de Oro' ||
            item.RegionRes === 'Iligan'
        )
        let davao = data.filter(
          item =>
            item.RegionRes === 'Region XI: Davao Region' ||
            item.RegionRes === '11' ||
            item.RegionRes === 'Compostela Valley' ||
            item.RegionRes === 'Davao City' ||
            item.RegionRes === 'Davao del Norte' ||
            item.RegionRes === 'Davao del Sur' ||
            item.RegionRes === 'Davao Oriental' ||
            item.RegionRes === 'Davao de Oro' ||
            item.RegionRes === 'Davao Occidental'
        )
        let soccsksargen = data.filter(
          item =>
            item.RegionRes === 'Region XII: SOCCSKSARGEN' ||
            item.RegionRes === '12' ||
            item.RegionRes === 'Soccsksargen' ||
            item.RegionRes === 'Cotabato (North Cotabato)' ||
            item.RegionRes === 'Cotabato City' ||
            item.RegionRes === 'Cotabato City (not a province)' ||
            item.RegionRes === 'South Cotabato' ||
            item.RegionRes === 'Sarangani' ||
            item.RegionRes === 'South Cotabato' ||
            item.RegionRes === 'General Santos' ||
            item.RegionRes === 'Sultan Kudarat'
        )
        let caraga = data.filter(
          item =>
            item.RegionRes === '13' ||
            item.RegionRes === 'Caraga' ||
            item.RegionRes === 'CARAGA' ||
            item.RegionRes === 'Agusan del Norte' ||
            item.RegionRes === 'Agusan del Sur' ||
            item.RegionRes === 'Dinagat Islands' ||
            item.RegionRes === 'Surigao del Norte' ||
            item.RegionRes === 'Surigao del Sur'
        )
        let barmm = data.filter(
          item =>
            item.RegionRes === 'BARMM' ||
            item.RegionRes === 'Lanao del Sur' ||
            item.RegionRes === 'Basilan' ||
            item.RegionRes === 'Sulu' ||
            item.RegionRes === 'Tawi-Tawi' ||
            item.RegionRes === 'Cotabato City' ||
            item.RegionRes === 'Maguindanao'
        )

        // total confirmed
        let ncrTotal = ncr.length
        let ilocosTotal = ilocos.length
        let carTotal = car.length
        let cagayanValleyTotal = cagayanValley.length
        let centralLuzonTotal = centralLuzon.length
        let calabarzonTotal = calabarzon.length
        let mimaropaTotal = mimaropa.length
        let bicolTotal = bicol.length
        let westernVisayasTotal = westernVisayas.length
        let centralVisayasTotal = centralVisayas.length
        let easternVisayasTotal = easternVisayas.length
        let zamboangaPeninsulaTotal = zamboangaPeninsula.length
        let northernMindanaoTotal = northernMindanao.length
        let davaoTotal = davao.length
        let soccsksargenTotal = soccsksargen.length
        let caragaTotal = caraga.length
        let barmmTotal = barmm.length

        // total deaths
        let ncrTotalDeaths = ncr.filter(item => item.RemovalType === 'Died')
          .length
        let ilocosTotalDeaths = ilocos.filter(
          item => item.RemovalType === 'Died'
        ).length
        let carTotalDeaths = car.filter(item => item.RemovalType === 'Died')
          .length
        let cagayanValleyTotalDeaths = cagayanValley.filter(
          item => item.RemovalType === 'Died'
        ).length
        let centralLuzonTotalDeaths = centralLuzon.filter(
          item => item.RemovalType === 'Died'
        ).length
        let calabarzonTotalDeaths = calabarzon.filter(
          item => item.RemovalType === 'Died'
        ).length
        let mimaropaTotalDeaths = mimaropa.filter(
          item => item.RemovalType === 'Died'
        ).length
        let bicolTotalDeaths = bicol.filter(item => item.RemovalType === 'Died')
          .length
        let westernVisayasTotalDeaths = westernVisayas.filter(
          item => item.RemovalType === 'Died'
        ).length
        let centralVisayasTotalDeaths = centralVisayas.filter(
          item => item.RemovalType === 'Died'
        ).length
        let easternVisayasTotalDeaths = easternVisayas.filter(
          item => item.RemovalType === 'Died'
        ).length
        let zamboangaPeninsulaTotalDeaths = zamboangaPeninsula.filter(
          item => item.RemovalType === 'Died'
        ).length
        let northernMindanaoTotalDeaths = northernMindanao.filter(
          item => item.RemovalType === 'Died'
        ).length
        let davaoTotalDeaths = davao.filter(item => item.RemovalType === 'Died')
          .length
        let soccsksargenTotalDeaths = soccsksargen.filter(
          item => item.RemovalType === 'Died'
        ).length
        let caragaTotalDeaths = caraga.filter(
          item => item.RemovalType === 'Died'
        ).length
        let barmmTotalDeaths = barmm.filter(item => item.RemovalType === 'Died')
          .length

        // total recovered
        let ncrTotalRecovered = ncr.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let ilocosTotalRecovered = ilocos.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let carTotalRecovered = car.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let cagayanValleyTotalRecovered = cagayanValley.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let centralLuzonTotalRecovered = centralLuzon.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let calabarzonTotalRecovered = calabarzon.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let mimaropaTotalRecovered = mimaropa.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let bicolTotalRecovered = bicol.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let westernVisayasTotalRecovered = westernVisayas.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let centralVisayasTotalRecovered = centralVisayas.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let easternVisayasTotalRecovered = easternVisayas.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let zamboangaPeninsulaTotalRecovered = zamboangaPeninsula.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let northernMindanaoTotalRecovered = northernMindanao.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let davaoTotalRecovered = davao.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let soccsksargenTotalRecovered = soccsksargen.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let caragaTotalRecovered = caraga.filter(
          item => item.RemovalType === 'Recovered'
        ).length
        let barmmTotalRecovered = barmm.filter(
          item => item.RemovalType === 'Recovered'
        ).length

        // data
        this.regions.push(
          {
            name: 'NCR',
            position: {
              lat: 14.4296531,
              lng: 120.8656222
            },
            confirmed: ncrTotal,
            deaths: ncrTotalDeaths,
            recovered: ncrTotalRecovered
          },
          {
            name: 'Ilocos',
            position: {
              lat: 18.1833377,
              lng: 120.5811423
            },
            confirmed: ilocosTotal,
            deaths: ilocosTotalDeaths,
            recovered: ilocosTotalRecovered
          },
          {
            name: 'CAR',
            position: {
              lat: 16.4152829,
              lng: 120.5933669
            },
            confirmed: carTotal,
            deaths: carTotalDeaths,
            recovered: carTotalRecovered
          },
          {
            name: 'Cagayan Valley',
            position: {
              lat: 17.6166718,
              lng: 121.714478
            },
            confirmed: cagayanValleyTotal,
            deaths: cagayanValleyTotalDeaths,
            recovered: cagayanValleyTotalRecovered
          },
          {
            name: 'Central Luzon',
            position: {
              lat: 15.0333385,
              lng: 120.6811446
            },
            confirmed: centralLuzonTotal,
            deaths: centralLuzonTotalDeaths,
            recovered: centralLuzonTotalRecovered
          },
          {
            name: 'Calabarzon',
            position: {
              lat: 14.2166719,
              lng: 121.164478
            },
            confirmed: calabarzonTotal,
            deaths: calabarzonTotalDeaths,
            recovered: calabarzonTotalRecovered
          },
          {
            name: 'Mimaropa',
            position: {
              lat: 13.3666719,
              lng: 121.1978113
            },
            confirmed: mimaropaTotal,
            deaths: mimaropaTotalDeaths,
            recovered: mimaropaTotalRecovered
          },
          {
            name: 'Bicol',
            position: {
              lat: 13.1333385,
              lng: 123.7311446
            },
            confirmed: bicolTotal,
            deaths: bicolTotalDeaths,
            recovered: bicolTotalRecovered
          },
          {
            name: 'Western Visayas',
            position: {
              lat: 10.716672,
              lng: 122.564478
            },
            confirmed: westernVisayasTotal,
            deaths: westernVisayasTotalDeaths,
            recovered: westernVisayasTotalRecovered
          },
          {
            name: 'Central Visayas',
            position: {
              lat: 10.3000053,
              lng: 123.8978113
            },
            confirmed: centralVisayasTotal,
            deaths: centralVisayasTotalDeaths,
            recovered: centralVisayasTotalRecovered
          },
          {
            name: 'Eastern Visayas',
            position: {
              lat: 11.2333386,
              lng: 124.9978113
            },
            confirmed: easternVisayasTotal,
            deaths: easternVisayasTotalDeaths,
            recovered: easternVisayasTotalRecovered
          },
          {
            name: 'Zamboanga Peninsula',
            position: {
              lat: 7.8333386,
              lng: 123.4311446
            },
            confirmed: zamboangaPeninsulaTotal,
            deaths: zamboangaPeninsulaTotalDeaths,
            recovered: zamboangaPeninsulaTotalRecovered
          },
          {
            name: 'Northern Mindanao',
            position: {
              lat: 8.4833386,
              lng: 124.6478113
            },
            confirmed: northernMindanaoTotal,
            deaths: northernMindanaoTotalDeaths,
            recovered: northernMindanaoTotalRecovered
          },
          {
            name: 'Davao',
            position: {
              lat: 7.066672,
              lng: 125.5978113
            },
            confirmed: davaoTotal,
            deaths: davaoTotalDeaths,
            recovered: davaoTotalRecovered
          },
          {
            name: 'Soccsksargen',
            position: {
              lat: 6.5000053,
              lng: 124.8478113
            },
            confirmed: soccsksargenTotal,
            deaths: soccsksargenTotalDeaths,
            recovered: soccsksargenTotalRecovered
          },
          {
            name: 'Caraga',
            position: {
              lat: 8.9500053,
              lng: 125.5311446
            },
            confirmed: caragaTotal,
            deaths: caragaTotalDeaths,
            recovered: caragaTotalRecovered
          },
          {
            name: 'BARMM',
            position: {
              lat: 7.216672,
              lng: 124.2478113
            },
            confirmed: barmmTotal,
            deaths: barmmTotalDeaths,
            recovered: barmmTotalRecovered
          }
        )
      })
    }
  }
}
</script>

<style lang="scss">
.map-container {
  width: 100%;
  height: 75vh;
  min-height: 350px;
  max-height: 846px;
  position: relative;

  .GMap__Wrapper {
    overflow: hidden;
    position: absolute;
    z-index: 0;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    padding: 0px;
    border-width: 0px;
    margin: 0px;
  }
}
</style>
