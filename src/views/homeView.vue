<template lang="pug">
  .home-view
    h1 {{ $t('home.title') }}
    router-link(to='/game') {{ $t('home.startGame') }}
</template>

<i18n>
ru:
  home:
    title: Добро пожаловать в игру Го
    startGame: Начать игру
en:
  home:
    title: Welcome to Go Game
    startGame: Start Game
</i18n>

<script>
export default {
  name: 'homeView'
}
</script>

<style scoped lang="stylus">
.home-view
  display flex
  flex-direction column
  align-items center
  justify-content center
  height 100vh
  gap 1rem

  h1
    font-size 2rem
</style>
