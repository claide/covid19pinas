
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'COVID19pinas - %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'covid19, covid19 ph, covid19 tracker philippines, covid19 tracker ph' },
      { hid: 'description', name: 'description', content: 'Tracks current COVID19 cases and history in the Philippines' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Just another COVID19 tracker for Philippines'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://covid19pinas.ml/'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://covid19pinas.ml/virus.jpg'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'This website gathers data from credible sources, official reports and outlets of government to provide the number of COVID19 cases, deaths and recoveries within the Philippines. As new situation is published, this website will be updated regularly.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#17b794' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-moment.js',
    { src: '~plugins/vue-chart.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-163137730-1'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    'nuxt-leaflet',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
