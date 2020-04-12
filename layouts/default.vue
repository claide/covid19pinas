<template>
  <div>
    <b-navbar wrapper-class="container is-fluid" type="is-dark" :fixed-top="true">
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">COVID19PINAS</b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
        <b-navbar-item tag="router-link" to="cases">Cases</b-navbar-item>
        <b-navbar-item tag="router-link" to="lockdowns">Lockdowns</b-navbar-item>
        <b-navbar-item tag="router-link" to="map">Map</b-navbar-item>
        <b-navbar-item tag="router-link" to="useful-resources">Useful Resources</b-navbar-item>
        <b-navbar-item tag="router-link" to="about">About</b-navbar-item>
      </template>
      <template slot="end">
        <a
          class="navbar-item"
          href="https://github.com/claide/covid19pinas"
          @click.prevent="trackGithub"
          target="_blank"
        >
          Save repo with a star &nbsp; &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              class="is-icon-nav"
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        </a>
      </template>
    </b-navbar>

    <section class="main-content">
      <div class="container is-fluid">
        <nuxt />
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <p class="has-text-centered">
          Handcrafted by
          <a
            href="http://www.francismagallen.com/"
            target="_blank"
            @click.prevent="trackFolio"
            class="has-text-green"
          >Francis Magallen</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  },
  methods: {
    trackGithub() {
      const url = 'https://github.com/claide/covid19pinas'
      this.$ga.query('send', 'event', 'outbound', 'click', url, {
        transport: 'beacon',
        hitCallback() {
          document.location = url
        }
      })
    },
    trackFolio() {
      const url = 'http://www.francismagallen.com/'
      this.$ga.query('send', 'event', 'outbound', 'click', url, {
        transport: 'beacon',
        hitCallback() {
          document.location = url
        }
      })
    }
  }
}
</script>
