<template lang="pug">
  header.app-header
    .title {{$t('title')}}
    g-icon-button.icon(
      type='github'
      @click='goGitHub'
    )
</template>

<i18n>
ru:
  title: Игра ГО
en:
  title: Game GO
</i18n>

<script>
import GIconButton from '@/components/inputs/GIconButton.vue'

export default {
  name: 'GHeader',

  components: { GIconButton },

  methods: {
    goGitHub() {
      window.open('https://github.com/andrew-kras', '_blank')
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-header
  width 100%
  height 50px
  background-color $header-bg
  $flex(ai: center, jc: center)
  padding 0 42px
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  border-bottom solid 2px $header-border

  .title
    margin 0
    $text-bold()
    color $header-text

.icon
  margin-left auto
</style>
