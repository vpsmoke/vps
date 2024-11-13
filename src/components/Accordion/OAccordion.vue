<template>
  <q-expansion-item ref="componentRef" v-bind="attrs">
    <template v-for="slot in Object.keys(slots)" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </q-expansion-item>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs, ref } from 'vue'

const slots = useSlots()
const attrs = useAttrs()

const componentRef = ref(null)

defineExpose({ componentRef })
</script>

<style lang="scss" scoped></style>
