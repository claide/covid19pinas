<template>
  <div class="error-page">
    <div class="container">
      <nuxt />
    </div>
    <footer class="footer">
      <div class="container">
        <p class="has-text-centered">
          Handcrafted by
          <a
            href="http://www.francismagallen.com/"
            target="_blank"
            @click.prevent="trackFolio"
            class="has-text-primary"
          >Francis Magallen</a>
        </p>
      </div>
    </footer>
  </div>
</template>
