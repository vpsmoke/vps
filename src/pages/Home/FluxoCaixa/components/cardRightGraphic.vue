<template>
  <div
    v-for="card in cards"
    :key="card.title"
    class="w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
  >
    <div class="">
      <h1
        class="text-caps-2 text-alert-success tracking-wider"
        :class="
          card.title == 'Receitas'
            ? 'text-alert-success'
            : card.title == 'Despesas'
            ? 'text-alert-error'
            : 'text-[#1093EC]'
        "
      >
        {{ card.title }}
      </h1>
      <div class="flex items-center gap-4">
        <span class="text-headline-4 text-neutral-60">R$</span>
        <p class="mt-16 text-title-3">{{ card.valor }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  cards: [],
})
</script>

<style lang="sass"></style>
