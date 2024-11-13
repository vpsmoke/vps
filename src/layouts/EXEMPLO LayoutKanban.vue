<template>
  <q-layout view="hHh Lpr fFf" class="layout-kanban">
    <MenuMultiLevel :menu="menuList"></MenuMultiLevel>
    <BaseHeader>
      <template #right>
        <OInput
          size="sm"
          placeholder="Busque por chamado, projeto.."
          class="no-label text-white/70"
          type="search"
          style="--neutral-70: rgba(var(--white), 0.7)"
        >
          <template #prepend>
            <q-icon name="search"></q-icon>
          </template>
        </OInput>

        <!-- settings -->
        <OButton
          class="text-neutral-10 w-32 h-32 !p-0 bg-white/10 !border-transparent"
          secondary
          size="sm"
        >
          <q-icon size="1.25rem" name="notifications"></q-icon>
          <q-menu class="w-[200px]">
            <q-item>
              <q-item-section>Em Breve</q-item-section>
            </q-item>
          </q-menu>
        </OButton>
      </template>
    </BaseHeader>
    <KanbanHeader
      @tree-points-click="openModalRight"
      @reload="reloadData"
    ></KanbanHeader>
    <KanbanModalRight ref="modalRight"></KanbanModalRight>
    <q-page-container
      class="kanban-page-container"
      style="padding-top: var(--top-size)"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import KanbanHeader from 'src/components/Kanban/KanbanHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import { menuList } from 'src/utils/menuList.js'
import KanbanModalRight from 'src/components/Kanban/KanbanModalRight.vue'
import OInput from 'src/components/Input/OInput.vue'
import OButton from 'src/components/Button/OButton.vue'
import emitter from 'src/boot/emitter'
const dev = process.env.dev

const modalRight = ref(null)

function openModalRight() {
  modalRight.value.dialogRef.show()
}
function reloadData() {
  emitter.emit('reloadDataKanban')
}
</script>

<style lang="sass">

.layout-kanban
  --breadcrumb-color: rgba(var(--white),0.7)


.q-layout.layout-kanban
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 15.56%)
  --top-size: calc(var(--header-kanban-height) + var(--header-base-height))
  .body--dark &
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))


.kanban-page-container

  margin-left: var(--Nv0-sidebar-width)
  height: calc(100vh - var(--top-size))
</style>
