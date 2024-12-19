<template lang="pug">
  .home-view
    .title {{ $t('title') }}
    g-button(
      :text='$t("start")'
      @click='goToGame'
    )
    .rules
      h3 {{ $t('rules.title') }}
      p {{ $t('rules.intro') }}
      h4 {{ $t('rules.basics.title') }}
      ul
        li {{ $t('rules.basics.field') }}
        li {{ $t('rules.basics.players') }}
        li {{ $t('rules.basics.goal') }}
      h4 {{ $t('rules.gameplay.title') }}
      ul
        li {{ $t('rules.gameplay.placing') }}
        li {{ $t('rules.gameplay.capturing') }}
        li {{ $t('rules.gameplay.pass') }}
        li {{ $t('rules.gameplay.end') }}
      h4 {{ $t('rules.rules.title') }}
      ul
        li {{ $t('rules.rules.breath') }}
        li {{ $t('rules.rules.ko') }}
        li {{ $t('rules.rules.scoring') }}
      h4 {{ $t('rules.features.title') }}
      ul
        li {{ $t('rules.features.strategy') }}
        li {{ $t('rules.features.depth') }}
        li {{ $t('rules.features.accessibility') }}
</template>

<i18n>
ru:
  title: Добро пожаловать в игру Го
  start: Начать игру 1 на 1
  rules:
    title: "Правила игры Го"
    intro: "Го — это древняя настольная игра, зародившаяся в Китае более 4 тысяч лет назад. Она сочетает в себе простоту правил и невероятную глубину стратегий. Цель игры — захватить территорию на игровом поле, окружив её своими камнями, и не дать сопернику сделать то же самое."
    basics:
      title: "Основы игры"
      field: "Игровое поле состоит из пересечений линий, создающих сетку 19×19 (возможны меньшие размеры: 9×9 или 13×13 для новичков)."
      players: "Играют двое: один использует черные камни, другой — белые. Черный игрок ходит первым. Далее ходы чередуются."
      goal: "Игроки стараются окружить как можно больше территории на поле. Территория состоит из пустых пересечений, полностью окруженных камнями одного цвета."
    gameplay:
      title: "Ход игры"
      placing: "Игроки поочередно размещают свои камни на свободные пересечения. Камень, однажды поставленный на поле, не перемещается."
      capturing: "Если группа камней противника (ряд смежных камней одного цвета) полностью окружена вашими камнями и не имеет дыхания (свободных пересечений рядом), она снимается с доски."
      pass: "Игрок может пропустить ход, если считает, что выгодных действий на поле больше нет."
      end: "Игра заканчивается, когда оба игрока подряд пропускают ход. Затем подсчитывается территория и захваченные камни."
    rules:
      title: "Правила"
      breath: "Каждый камень или группа камней должна иметь хотя бы одно свободное пересечение рядом (дыхание). Если оно отсутствует, камни снимаются с доски."
      ko: "Игроку запрещено делать ход, который приводит к точному повторению предыдущего состояния на доске."
      scoring: "Очки начисляются за количество пустых пересечений внутри окруженной территории и за захваченные камни. У белых дополнительно есть коми — бонусные очки за второй ход (обычно 6,5 очков)."
    features:
      title: "Особенности игры Го"
      strategy: "Го — это игра баланса между локальными сражениями и глобальным контролем территории. Решения в одной части доски могут повлиять на развитие игры в другой."
      depth: "Несмотря на простые правила, количество возможных ходов невероятно велико, что делает каждую партию уникальной."
      accessibility: "Го подходит для игроков всех уровней — от новичков до мастеров, каждый найдет в игре что-то новое."
en:
  title: Welcome to Go Game
  start: Start game 1 on 1
  rules:
    title: "Rules of Go Game"
    intro: "Go is an ancient board game that originated in China over 4,000 years ago. It combines simple rules with incredible strategic depth. The goal of the game is to capture territory on the board by surrounding it with your stones and preventing your opponent from doing the same."
    basics:
      title: "Basics of the Game"
      field: "The board consists of intersections of lines forming a 19×19 grid (smaller sizes like 9×9 or 13×13 are possible for beginners)."
      players: "The game is played by two players: one uses black stones, the other white. Black moves first, and turns alternate."
      goal: "Players aim to surround as much territory as possible on the board. Territory consists of empty intersections completely surrounded by stones of one color."
    gameplay:
      title: "Gameplay"
      placing: "Players take turns placing their stones on empty intersections. A stone, once placed, does not move."
      capturing: "If a group of the opponent's stones (a sequence of adjacent stones of the same color) is completely surrounded by your stones and has no 'breath' (free adjacent intersections), it is removed from the board."
      pass: "A player may pass their turn if they believe there are no advantageous moves left on the board."
      end: "The game ends when both players consecutively pass their turns. The territory and captured stones are then counted."
    rules:
      title: "Rules"
      breath: "Each stone or group of stones must have at least one adjacent free intersection (breath). If it does not, the stones are removed from the board."
      ko: "A player is prohibited from making a move that results in an exact repetition of the previous board state."
      scoring: "Points are awarded for the number of empty intersections within surrounded territory and for captured stones. Additionally, white has 'komi'—bonus points for the second move (usually 6.5 points)."
    features:
      title: "Features of Go Game"
      strategy: "Go is a game of balance between local battles and global territory control. Decisions in one part of the board can affect developments in another."
      depth: "Despite its simple rules, the number of possible moves is incredibly vast, making each game unique."
      accessibility: "Go is suitable for players of all levels—from beginners to masters, everyone can find something new in the game."
</i18n>

<script>
import GButton from '@/components/inputs/GButton.vue'

export default {
  name: 'homeView',

  components: { GButton },

  methods: {
    goToGame() {
      this.$router.push({ name: 'game' })
    }
  }
}
</script>

<style scoped lang="stylus">
.home-view
  $flex(dir:column, ai:center)
  width 100%
  height 100%
  padding 40px 24px 0 24px
  gap 12px

  .title
    $text-bold()

  .rules
    max-width 800px
    max-height 800px
    overflow-y scroll
    text-align justify
    $text-regular()
</style>
