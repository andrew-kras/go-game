<template lang="pug">
  .game-view
    .title {{ $t('title') }}
    g-button(
      :text='$t("reset")'
      @click='resetGame'
    )
    .game-board(:style='{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }')
      div.game-cell(
        v-for='cell in flatBoard'
        :key='cell.id'
        :class='{"black-stone": cell.value === "black", "white-stone": cell.value === "white"}'
        @click='makeMove(cell.id)'
      )
</template>

<i18n>
ru:
  title: Игровое поле
  reset: Сбросить игру
en:
  title: Game Board
  reset: Reset Game
</i18n>

<script>
import { mapStores } from 'pinia'
import gameStore, {
  GETTER_BOARD,
  GETTER_CURRENT_PLAYER,
  ACTION_MAKE_MOVE,
  ACTION_RESET_GAME
} from '@/stores/game.js'
import GButton from '@/components/inputs/GButton.vue'

export default {
  name: 'gameView',

  components: {GButton},

  computed: {
    ...mapStores(gameStore),

    board() {
      return this.gameStore[GETTER_BOARD]
    },

    flatBoard() {
      return this.board.flat()
    },

    boardSize() {
      return this.board.length
    },

    currentPlayer() {
      return this.gameStore[GETTER_CURRENT_PLAYER]
    }
  },

  methods: {
    makeMove(cellId) {
      this.gameStore[ACTION_MAKE_MOVE](cellId)
    },

    resetGame() {
      this.gameStore[ACTION_RESET_GAME]()
    }
  },

  created() {
    this.resetGame()
  }
}
</script>

<style scoped lang="stylus">
.game-view
  $flex(dir:column, ai:center)
  width 100%
  height 100%
  padding 40px 24px 0 24px
  gap 12px

  .title
    $text-bold()

.game-board
  display grid
  gap 1px
  background-color $color5
  grid-template-columns repeat(19, 1fr)

  width 460px
  height 460px

  border 2px solid $color5
  border-radius 2px

.game-cell
  background-color $color4
  border 1px solid $color5
  $flex(ai: center, jc: center)

.black-stone
  background-color $black
  border-radius 50%
  $square(50%)

.white-stone
  background-color $white
  border-radius 50%
  $square(50%)
</style>
