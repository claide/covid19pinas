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
  }
}
</script>
