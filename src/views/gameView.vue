<template lang="pug">
  .game-view
    .title {{ $t('game.title') }}
    .game-board
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
  $flex(dir: column)
  width 100%
  height 100%
  padding 40px 24px 0 24px
  gap 12px

  .title
    $text-bold()
  .game-board
    width 80%
    height 80%
    border 2px solid #000
    display flex
    align-items center
    justify-content center
</style>
