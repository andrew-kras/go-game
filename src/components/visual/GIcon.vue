<template lang="pug">
  svg.g-icon
    use(
      :href='sprite'
      :style='color ? { "--theme-svg-color": color } : null'
    )
</template>

<script>
export default {
  name: 'GIcon',

  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: null
    }
  },

  computed: {
    sprite() {
      return `/public/icons/sprite-desktop.svg#${this.name}`
    }
  }
}
</script>

<style scoped lang="stylus">
.g-icon
  $square(24px)
</style>
