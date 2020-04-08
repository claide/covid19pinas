<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <p class="card-title is-marginless">{{ title }}</p>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
