<template>
  <q-avatar
    size="32px"
    class="overlapping !w-32 !h-32 absolute border-white border-2 dark:border-d-neutral-10 overflow-hidden avatar"
    :style="`${side}: ${index * 15}px;  'z-index':-${index}`"
    :class="{ '!static': estatic }"
  >
    <q-img
      :no-spinner="true"
      :src="href ? href : GLOBAL.imgSrc(item.foto)"
      class="w-full h-full m-auto absolute inset-0"
      :class="{ '!relative': estatic }"
      :no-transition="true"
    />
    <slot></slot>
  </q-avatar>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
defineProps({
  item: Object,
  index: Number,
  href: String,
  estatic: Boolean,
  side: {
    type: String,
    default: 'right',
  },
})
</script>

<style lang="sass" scoped>
.avatar.ajuste-img :deep(img)
  width: calc(100% - 3px)
  height: calc(100% - 3px)
</style>
