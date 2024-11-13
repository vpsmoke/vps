<template>
  <q-checkbox
    class="o-check"
    v-bind="attrs"
    :size="setSize"
    :data-size="attrs.size"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </q-checkbox>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()

const sizes = { sm: '1rem ', md: '1.25rem', lg: '1.5rem' }
const setSize = sizes[attrs.size]
</script>

<style lang="scss" scoped></style>
