<template>
  <q-layout view="hHh lpR fFf" style="height: 100vh">
    <q-header
      ref="header"
      class="bg-d-neutral-30 border-b border-white dark:bg-d-neutral-10 header-top"
    >
      <q-toolbar>
        <q-btn
          class="text-neutral-10"
          dense
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon
            size="28px"
            name="svguse:/icons.svg#icon_menu_kanban"
          ></q-icon>
        </q-btn>

        <q-toolbar-title>
          <RouterLink to="/" class="relative w-[220px] h-48 flex items-center">
            <MenuLogo class="w-[151px] h-max my-auto"></MenuLogo>
          </RouterLink>
        </q-toolbar-title>

        <q-btn class="text-neutral-10" dense flat round>
          <q-icon size="28px" name="tune"></q-icon>
          <BaseHeaderMenu></BaseHeaderMenu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <menu-multi-level
      v-if="sectionActive === 'menuMultiLevel'"
      :menu="menuList"
    />

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="dark:!bg-d-neutral-10 !fixed"
      ref="drawer"
    >
      <q-scroll-area class="fit">
        <q-list class="mt-24 flex flex-col">
          <q-item
            dense
            class="text-neutral-100/40 dark:text-white/40 text-caps-3 !py-4 !min-h-24 flex items-end order-1"
          >
            Components
          </q-item>
          <q-item
            v-for="(item, index) in list"
            :key="item.id"
            clickable
            v-ripple
            @click="sectionActive = item.id"
            :style="{ order: item.order ? item.order : index }"
          >
            <q-item-section class="text-neutral-70 dark:text-white/80"
              >{{ item.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!--  -->

    <q-page-container class="overflow-x-hidden">
      <q-scroll-area style="height: calc(100vh - 51px)">
        <div class="p-24 flex gap-16 overflow-hidden w-full">
          <transition name="list" tag="section">
            <section-tipographie v-if="sectionActive === 'typographie'" />
            <section-button v-else-if="sectionActive === 'button'" />
            <section-radio v-else-if="sectionActive === 'checkbox'" />
            <section-chips v-else-if="sectionActive === 'chips'" />
            <section-intro v-else-if="sectionActive === 'intro'" />
            <section-breadcrumb v-else-if="sectionActive === 'breadcrumb'" />
            <section-input v-else-if="sectionActive === 'inputs'" />
            <section-selects v-else-if="sectionActive === 'selects'" />
            <section-tabs v-else-if="sectionActive === 'tabs'" />
            <section-table v-else-if="sectionActive === 'table'" />
            <section-popup-proxy v-else-if="sectionActive === 'popupProxy'" />
            <section-accordion v-else-if="sectionActive === 'accordion'" />
            <section-paginacao v-else-if="sectionActive === 'paginacao'" />
            <section-modal v-else-if="sectionActive === 'modal'" />
            <section-colors v-else-if="sectionActive === 'cores'" />
          </transition>
        </div>
      </q-scroll-area>
    </q-page-container>
    <q-page-sticky :offset="[32, 32]" class="z-[9999999]">
      <o-button
        primary
        fab
        icon="close"
        @click=";(sectionActive = 'intro') && drawer.show()"
        v-if="sectionActive === 'menuMultiLevel'"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

import OButton from 'src/components/Button/OButton.vue'

import SectionAccordion from './SectionAccordion.vue'
import SectionBreadcrumb from './SectionBreadcrumb.vue'
import SectionButton from './SectionButton.vue'
import SectionChips from './SectionChips.vue'
import SectionColors from './SectionColors.vue'
import SectionInput from './SectionInput.vue'
import SectionIntro from './SectionIntro.vue'
import SectionModal from './SectionModal.vue'
import SectionPaginacao from './SectionPaginacao.vue'
import SectionPopupProxy from './SectionPopUpProxy.vue'
import SectionRadio from './SectionRadio.vue'
import SectionTable from './SectionTable.vue'
import SectionTipographie from './SectionTipographie.vue'
import SectionTabs from './SectionTabs.vue'
import SectionSelects from './SectionSelects.vue'

import BaseHeaderMenu from 'src/components/Header/BaseHeaderMenu.vue'
import MenuLogo from 'src/components/MenuMultiLevel/MenuLogo.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import logoAnimation from 'src/utils/animation/logo'
import { menuList } from 'src/utils/menuList'

const sectionActive = ref('intro')
const leftDrawerOpen = ref(true)

const header = ref(null)
const drawer = ref(null)

watch(sectionActive, (val) => {
  if (val === 'menuMultiLevel') drawer.value.hide()
})
onMounted(() => {
  if (sectionActive.value === 'menuMultiLevel') drawer.value.hide()
  // const animation = logoAnimation('.header-top')
  // animation.logoAnimationToNDT.play().progress(1)
})

const list = [
  {
    name: '@ Inicio',
    id: 'intro',
    order: -3,
  },
  {
    name: 'Cores',
    id: 'cores',
    order: -2,
  },
  {
    name: 'Button',
    id: 'button',
  },
  {
    name: 'Typographies',
    id: 'typographie',
    order: -1,
  },
  {
    name: 'Checkbox & RadioButton',
    id: 'checkbox',
  },
  {
    name: 'Badge, Status, Tags',
    id: 'chips',
  },
  {
    name: 'Menu Multi Level',
    id: 'menuMultiLevel',
  },
  {
    name: 'Breadcrumb',
    id: 'breadcrumb',
  },
  {
    name: 'Inputs',
    id: 'inputs',
  },
  {
    name: 'Selects',
    id: 'selects',
  },
  {
    name: 'Tabs',
    id: 'tabs',
  },
  {
    name: 'Table',
    id: 'table',
  },
  {
    name: 'Popup Proxy',
    id: 'popupProxy',
  },
  {
    name: 'Accordion',
    id: 'accordion',
  },
  {
    name: 'Paginaçao',
    id: 'paginacao',
  },
  {
    name: 'Modal',
    id: 'modal',
  },
].sort((a, b) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
})
</script>

<style lang="sass">

.showHeader
  .header-top
    z-index: 9999999999999999999
</style>
