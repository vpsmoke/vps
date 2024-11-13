<template>
  <div
    v-for="card in cards"
    :key="card.title"
    class="card w-[13.75rem] p-24 flex flex-col gap-16 justify-between md2:!w-full relative border border-neutral-30 rounded-md"
  >
    <p
      class="text-caps-2"
      :class="
        card.title == 'Disponíveis'
          ? 'text-alert-success'
          : card.title == 'Estoque baixo'
          ? 'text-alert-warning'
          : 'text-alert-error'
      "
    >
      {{ card.title }}
    </p>
    <p class="text-title-3">
      {{ card.valor }}
    </p>
    <span
      :class="
        card.title == 'Disponíveis'
          ? 'bg-alert-success'
          : card.title == 'Estoque baixo'
          ? 'bg-alert-warning'
          : 'bg-alert-error'
      "
      class="block w-24 h-6 rounded-b-md top-0 absolute"
    ></span>
  </div>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
defineProps({
  cards: [],
})
</script>

<style lang="sass"></style>
