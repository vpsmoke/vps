<template>
  <q-chip
    v-bind="attrs"
    :style="styleChip()"
    :data-size="attrs.size"
    :size="null"
    :ripple="false"
  >
    <q-badge
      v-if="attrs.badge"
      rounded
      class="shrink-0 w-8 h-8"
      :style="styleBadge"
    ></q-badge>

    <slot name="content"></slot>
  </q-chip>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs, watch, ref } from 'vue'
import { useQuasar } from 'quasar'

const slots = useSlots()
const attrs = useAttrs()
const $q = useQuasar()

const styleChip = () => ({
  color: `${
    attrs.color
      ? `${
          $q.dark.isActive
            ? 'rgba(var(--white), 0.9)'
            : `rgba(${attrs.color}, 1)`
        }`
      : `rgba(${attrs.bg}, 1)`
  }`,
  background: $q.dark.isActive
    ? `rgba(${attrs.color}, 0.2)`
    : `rgba(${attrs.color}, 0.09)`,
})

const styleBadge = {
  background: `rgba(${attrs.badgeColor || attrs.color}, 1)`,
}
</script>

<style lang="scss" scoped></style>
