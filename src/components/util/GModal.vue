<template lang="pug">
  .g-modal-overlay(
    v-if='visible'
    @click.self='closeOnOverlay'
  )
    .g-modal
      .g-modal-header
        h3.g-modal-title {{ title }}
        g-icon-button(
          type='close'
          @click='close'
        )
      .g-modal-content
        slot
</template>

<script>
import GIconButton from '@/components/inputs/GIconButton.vue'

export default {
  name: 'GModal',

  components: {GIconButton},

  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true
    }
  },

  emits: ['close'],

  methods: {
    close() {
      this.$emit('close')
    },

    closeOnOverlay() {
      if (this.closeOnOverlayClick) {
        this.close()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.g-modal-overlay
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background-color rgba(0, 0, 0, 0.5)
  $flex(ai: center, jc: center)

.g-modal
  background-color $app-bg
  border-radius 8px
  box-shadow 0 2px 10px rgba(0, 0, 0, 0.1)
  border dolid 2px $color5
  width 90%
  max-width 500px
  $flex(dir: column)
  overflow hidden

.g-modal-header
  $flex(jc: space-between, ai: center)
  padding 12px

.g-modal-title
  margin 0
  $text-bold()

.g-modal-content
  padding 24px
</style>
