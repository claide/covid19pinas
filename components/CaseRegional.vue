<template>
  <div class="card">
    <div class="card-content">
      <p class="card-title">Cases by Region</p>
      <div class="is-spacer-sm"></div>

      <b-table :data="regions">
        <template slot-scope="props">
          <b-table-column field="name" label="Region name">{{ props.row.name }}</b-table-column>
          <b-table-column field="confirmed" label="Total confirmed">{{ props.row.confirmed }}</b-table-column>
          <b-table-column field="deaths" label="Total deaths">{{ props.row.deaths }}</b-table-column>
          <b-table-column field="recovered" label="Total recovered">{{ props.row.recovered }}</b-table-column>
        </template>
        <template slot="footer">
          <small class="has-text-body">
            Source:
            <a
              href="https://ncovtracker.doh.gov.ph/"
              class="has-text-body"
            >Department of Health Philippines</a>
          </small>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      regions: []
    }
  },
  mounted() {
    this.loadDb()
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
            item.RegionRes === 'Batanes' ||
            item.RegionRes === 'Cagayan' ||
            item.RegionRes === 'Isabela' ||
            item.RegionRes === 'Nueva Vizcaya' ||
            item.RegionRes === 'Quirino'
        )
        let centralLuzon = data.filter(
          item =>
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
            item.RegionRes === 'Batangas' ||
            item.RegionRes === 'Cavite' ||
            item.RegionRes === 'Laguna' ||
            item.RegionRes === 'Quezon' ||
            item.RegionRes === 'Rizal' ||
            item.RegionRes === 'Lucena'
        )
        let mimaropa = data.filter(
          item =>
            item.RegionRes === 'Marinduque' ||
            item.RegionRes === 'Occidental Mindoro' ||
            item.RegionRes === 'Oriental Mindoro' ||
            item.RegionRes === 'Palawan' ||
            item.RegionRes === 'Romblon' ||
            item.RegionRes === 'Puerto Princesa'
        )
        let bicol = data.filter(
          item =>
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
            item.RegionRes === 'Zamboanga Peninsula' ||
            item.RegionRes === 'Zamboanga City' ||
            item.RegionRes === 'Zamboanga del Norte' ||
            item.RegionRes === 'Zamboanga Sibugay' ||
            item.RegionRes === 'Zamboanga del Sur'
        )
        let northernMindanao = data.filter(
          item =>
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
            item.RegionRes === 'Caraga' ||
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
            confirmed: ncrTotal,
            deaths: ncrTotalDeaths,
            recovered: ncrTotalRecovered
          },
          {
            name: 'Ilocos',
            confirmed: ilocosTotal,
            deaths: ilocosTotalDeaths,
            recovered: ilocosTotalRecovered
          },
          {
            name: 'CAR',
            confirmed: carTotal,
            deaths: carTotalDeaths,
            recovered: carTotalRecovered
          },
          {
            name: 'Cagayan Valley',
            confirmed: cagayanValleyTotal,
            deaths: cagayanValleyTotalDeaths,
            recovered: cagayanValleyTotalRecovered
          },
          {
            name: 'Central Luzon',
            confirmed: centralLuzonTotal,
            deaths: centralLuzonTotalDeaths,
            recovered: centralLuzonTotalRecovered
          },
          {
            name: 'Calabarzon',
            confirmed: calabarzonTotal,
            deaths: calabarzonTotalDeaths,
            recovered: calabarzonTotalRecovered
          },
          {
            name: 'Mimaropa',
            confirmed: mimaropaTotal,
            deaths: mimaropaTotalDeaths,
            recovered: mimaropaTotalRecovered
          },
          {
            name: 'Bicol',
            confirmed: bicolTotal,
            deaths: bicolTotalDeaths,
            recovered: bicolTotalRecovered
          },
          {
            name: 'Western Visayas',
            confirmed: westernVisayasTotal,
            deaths: westernVisayasTotalDeaths,
            recovered: westernVisayasTotalRecovered
          },
          {
            name: 'Central Visayas',
            confirmed: centralVisayasTotal,
            deaths: centralVisayasTotalDeaths,
            recovered: centralVisayasTotalRecovered
          },
          {
            name: 'Eastern Visayas',
            confirmed: easternVisayasTotal,
            deaths: easternVisayasTotalDeaths,
            recovered: easternVisayasTotalRecovered
          },
          {
            name: 'Zamboanga Peninsula',
            confirmed: zamboangaPeninsulaTotal,
            deaths: zamboangaPeninsulaTotalDeaths,
            recovered: zamboangaPeninsulaTotalRecovered
          },
          {
            name: 'Northern Mindanao',
            confirmed: northernMindanaoTotal,
            deaths: northernMindanaoTotalDeaths,
            recovered: northernMindanaoTotalRecovered
          },
          {
            name: 'Davao',
            confirmed: davaoTotal,
            deaths: davaoTotalDeaths,
            recovered: davaoTotalRecovered
          },
          {
            name: 'Soccsksargen',
            confirmed: soccsksargenTotal,
            deaths: soccsksargenTotalDeaths,
            recovered: soccsksargenTotalRecovered
          },
          {
            name: 'Caraga',
            confirmed: caragaTotal,
            deaths: caragaTotalDeaths,
            recovered: caragaTotalRecovered
          },
          {
            name: 'BARMM',
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
