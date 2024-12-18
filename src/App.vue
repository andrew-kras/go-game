<template lang="pug">
  div#app
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
@import './styles/globals.styl'
#app
  background #f5f5f5
  height 100vh
  width 100vw
  display flex

#overlay
  position absolute
  left 0
  top 0
  width 0
  height 0
</style>
