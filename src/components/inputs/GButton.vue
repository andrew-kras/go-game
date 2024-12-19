<template lang="pug">
  button.g-button(
    :class='classes'
    :disabled='disabled'
    @click='click'
  )
    span {{ text }}
</template>

<script>

export default {
  name: 'GButton',

  props: {
    text: {
      type: String,
      required: true
    },
    // medium | small
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    classes() {
      return {
        [this.size]: true
      }
    }
  },

  methods: {
    click() {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
button
  $flex(center, center, row)
  width max-content
  gap 8px
  border-radius 8px
  $text-bold()

.g-button
  position relative
  background-color $btn-bg-default
  color $btn-fg-default
  border 2px solid $btn-border-default

  &:hover
    background-color $btn-bg-hover
    border 2px solid $btn-border-hover

  &:active
    background-color $btn-bg-active
    border 2px solid $btn-border-active
    transform translateY(2px)

  &.medium
    padding 0 42px
    height 48px
    white-space nowrap

  &.small
    padding 0 24px
    height 38px
    border-radius 8px
</style>
