<template lang="pug">
  .game-view
    h1 {{ $t('game.title') }}
    .game-board Placeholder for Game Board
</template>

<i18n>
ru:
  game:
    title: Игровое поле
en:
  game:
    title: Game Board
</i18n>

<script>
export default {
  name: 'gameView'
}
</script>

<style scoped lang="stylus">
.game-view
  display flex
  flex-direction column
  align-items center
  justify-content center
  height 100vh

  h1
    font-size 2rem
  .game-board
    width 80%
    height 80%
    border 2px solid #000
    display flex
    align-items center
    justify-content center
</style>
