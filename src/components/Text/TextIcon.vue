<template>
  <div
    class="inline-flex items-center gap-6 text-neutral-100 text-title-3 dark:text-white/90"
  >
    <q-icon
      class="text-primary-pure w-24 h-24"
      :class="iconClass"
      :name="icon"
    ></q-icon>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  text: String,
  iconClass: String,
})
</script>

<style lang="scss" scoped></style>
