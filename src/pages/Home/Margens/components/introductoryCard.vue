<template>
  <Swiper
    direction="horizontal"
    :modules="[Pagination]"
    :spaceBetween="12"
    slidesPerView="auto"
    class="!w-full"
    :touchStartPreventDefault="false"
  >
    <SwiperSlide v-for="card in cards" :key="card" class="!w-max">
      <div
        class="card min-w-[21rem] max-w-[21rem] md2:!w-full border border-neutral-30 rounded-md"
      >
        <!-- header -->
        <div class="pt-16 pl-16 pr-8 items-center">
          <p class="text-headline-2">{{ card.nome }}</p>

          <p class="text-12">
            Saldo inicial:
            <span v-if="hidden"> ****** </span>
            <span v-else>
              ${{ GLOBAL.currencyBR(Number(card.saldo_inicial).toFixed(2)) }}
            </span>
          </p>
        </div>
        <!-- content -->
        <div class="flex justify-between items-center p-16">
          <p class="text-paragraph-1">R$</p>
          <p class="text-title-2">
            <span v-if="hidden">******</span>
            <span v-else>{{
              GLOBAL.currencyNotPrefix(Number(card.saldo).toFixed(2))
            }}</span>
          </p>
        </div>
        <div class="bg-neutral-30 w-full h-1"></div>
        <!-- header -->
        <div class="flex items-center p-8 gap-8 w-full">
          <div class="p-8 flex-1 bg-alert-success-10 rounded-[3px] relative">
            <span
              class="block h-24 w-3 bg-alert-success rounded-r-[4px] absolute left-0 top-0 bottom-0 my-auto"
            ></span>
            <p class="text-paragraph-1 text-alert-success">
              <span class="text-paragraph-3">R$ </span>
              <span v-if="hidden">******</span>
              <span v-else>
                {{ GLOBAL.currencyNotPrefix(Number(card.receitas).toFixed(2)) }}
              </span>
            </p>
          </div>
          <div class="p-8 flex-1 bg-alert-error-10 rounded-[3px] relative">
            <span
              class="block h-24 w-3 bg-alert-error rounded-r-[4px] absolute left-0 top-0 bottom-0 my-auto"
            ></span>
            <p class="text-paragraph-1 text-alert-error">
              <span class="text-paragraph-3">R$ </span>
              <span v-if="hidden">******</span>
              <span v-else>
                {{ GLOBAL.currencyNotPrefix(Number(card.despesas).toFixed(2)) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import GLOBAL from 'src/utils/GLOBAL'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
defineProps({ cards: [], hidden: Boolean })
</script>

<style lang="sass"></style>
