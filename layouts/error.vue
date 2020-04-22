<template>
  <div class="section is-error">
    <div class="container has-text-centered">
      <h1
        v-if="error.statusCode === 404"
        class="is-size-3 is-uppercase has-text-black"
      >I can't find that page.</h1>
      <h1 v-else class="is-size-3 is-uppercase has-text-black">An error occurred</h1>
      <p class="has-text-grey">Sorry, I can't find that page. It might be broken or no longer exist.</p>
      <br />
      <nuxt-link to="/" class="button is-primary">Back to home</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'errorLayout'
}
</script>

<style lang="scss" scoped>
.is-error {
  height: 89vh;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>
