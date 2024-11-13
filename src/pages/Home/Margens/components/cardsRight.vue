<template>
  <div class="flex mt-32 md2:mt-0 flex-col gap-16 md2:w-full">
    <div
      v-for="card in cards"
      :key="card.title"
      class="w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
    >
      <div class="">
        <h1 class="text-caps-2 tracking-wider" :class="card.color">
          {{ card.title }}
        </h1>
        <div class="flex items-center gap-4">
          <span class="text-headline-4 text-neutral-60">R$</span>
          <p class="mt-16 text-title-3">{{ card.valor }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cards: [],
  valores: {},
})
</script>

<style lang="sass"></style>
