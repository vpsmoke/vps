<template>
  <q-chip class="o-chip" v-bind="attrs" :data-size="attrs.size" :size="null">
    <template v-for="slot in Object.keys(slots)" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </q-chip>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>

<style lang="sass">
@import "src/css/quasar/variables"
.o-chip
    border: .0625rem inset rgba(var(--neutral-100), 0.1)
    box-shadow: initial !important
    color: rgba(var(--neutral-100),1)
    &.q-dark
      color: rgba(var(--white),0.9)
      background: rgba(var(--white),0.1)

    background: white

    &:not(.q-chip--square)
      border-radius: 100px

    &[data-size="sm"]
      font-size:10px
      height: 24px !important
      padding: .125rem .25rem !important
    &[data-size="md"]
      font-size:12px
      height: 32px !important
      padding: .125rem .375rem !important
    &[data-size="lg"]
      font-size:14px
      height: 40px !important
      padding: .125rem .5rem !important

.o-chip
    .q-icon
      font-size: 1.58em !important
    &.q-chip--selected
      background: rgba(var(--primary-pure), 1)
      color: rgba(var(--neutral-100),1)
</style>
