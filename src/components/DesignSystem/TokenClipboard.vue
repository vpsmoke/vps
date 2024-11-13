<template>
  <small
    @click="copy"
    class="grow-0 h-max p-2 px-4 bg-neutral-100/10 text-neutral-100/90 rounded-md dark:bg-d-neutral-30 dark:text-white/80 hover:brightness-150 cursor-pointer border border-transparent dark:border-white/10"
  >
    <slot></slot>
  </small>
</template>

<script setup>
import { Notify, copyToClipboard } from 'quasar'
async function copy ({ currentTarget }) {
  const text = currentTarget.textContent.trim()

  try {
    copyToClipboard(text)
    Notify.create({
      message: `Token copiado  <strong>${text}</strong>`,
      position: 'top-right',
      timeout: 1000,
      html: true
    })
  } catch (e) {
    Notify.create({
      message: 'Ocorreu um erro ao copiar',
      position: 'top-right',
      timeout: 1000
    })
  }
}
</script>

<style lang="scss" scoped></style>
