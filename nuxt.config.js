require('dotenv').config()

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'COVIDPH - %s',
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
        content: 'https://covidph.live/'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://covidph.live/virus.jpg'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'This website gathers data from credible sources, official reports and outlets of government to provide the number of COVID19 cases, deaths and recoveries within the Philippines. As new situation is published, this website will be updated regularly.'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: 'https://covidph.live/'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Just another COVID19 tracker for Philippines'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'This website gathers data from credible sources, official reports and outlets of government to provide the number of COVID19 cases, deaths and recoveries within the Philippines. As new situation is published, this website will be updated regularly.'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://covidph.live/virus.jpg'
      },
      {
        hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'COVID19'
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
    { src: '~plugins/leaflet.js', ssr: false },
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
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.API_KEY,
          authDomain: process.env.AUTH_DOMAIN,
          databaseURL: process.env.DATABASE_URL,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.MESSAGING_SENDER_ID,
          appId: process.env.APP_ID,
          measurementId: process.env.MEASUREMENT_ID,
          databaseSecret: process.env.DATABASE_SECRET,
        },
        services: {
          auth: true,
          realtimeDb: true,
        }
      }
    ],
  ],

  env: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    databaseSecret: process.env.DATABASE_SECRET,
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  vue: {
    config: {
      productionTip: false
    }
  }
}
