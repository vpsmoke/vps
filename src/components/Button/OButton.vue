<template>
  <q-btn
    v-bind="attrs"
    :ripple="{ early: true }"
    :padding="setPadding"
    :size="setSize"
    :style="{ minHeight: setHeight }"
  >
    <template v-for="slot in Object.keys(slots)" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </q-btn>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()

const padding = {
  sm: '.5rem .375rem',
  md: '.5rem .5625rem',
  lg: '.5rem  .75rem',
}
const sizes = { sm: '.75rem ', md: '.875rem', lg: '1rem' }
const height = { sm: '2rem ', md: '2.5rem', lg: '3rem' }

const setPadding = padding[attrs.size]
const setSize = sizes[attrs.size]

const setHeight = height[attrs.size]
</script>

<style lang="scss" scoped></style>
