<template lang="pug">
  button.g-icon-button(
    :class='classes'
    :disabled='disabled'
    @click='$emit("click")'
  )
    g-icon.icon(:name='type')
</template>

<script>
import GIcon from '@/components/visual/GIcon.vue'

export default {
  name: 'GIconButton',

  components: { GIcon },

  props: {
    // icon name
    type: {
      type: String,
      required: true
    },
    // x-large | large | medium | small
    size: {
      type: String,
      default: 'large'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledCursorOverride: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    classes() {
      return {
        [this.size]: true,
        'disabled-cursor-override': this.disabledCursorOverride
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.g-icon-button
  $flex(center, center)
  box-sizing content-box
  border none
  outline none
  border-radius 50%
  cursor pointer

  padding 0
  margin 0

  &.x-large
    $square(32px)

  &.large
    $square(24px)

  &.medium
    $square(20px)

  &.small
    $square(16px)

  &:disabled
    cursor not-allowed
    .icon
      $svg-color($black)

  &.disabled-cursor-override
    cursor default

  .icon
    $svg-color($black)
</style>
