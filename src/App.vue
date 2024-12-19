<template lang="pug">
  div#app
    g-header
    router-view
</template>

<script>
import GHeader from '@/components/util/GHeader.vue'

export default {
  name: 'App',

  components: {GHeader}
}
</script>

<style lang="stylus">
@import './styles/globals.styl'
#app
  background $app-bg
  height 100vh
  width 100vw
  $flex(dir: column)
</style>

<style lang="css" src="./styles/scrollbars.css" />
