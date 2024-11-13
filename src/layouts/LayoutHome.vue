<template>
  <q-layout view="hHh Lpr fFf" class="home-layout">
    <KeepAlive>
      <component :is="MenuMultiLevel" :menu="menuWithAccess" />
    </KeepAlive>
    <BaseHeader></BaseHeader>
    <q-page-container class="home-page-container bg-neutral-10 md2:!ml-0">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import BaseHeader from 'src/components/Header/BaseHeader.vue'
import MenuMultiLevel from 'src/components/MenuMultiLevel/MenuMultiLevel.vue'
import { menuList } from 'src/utils/menuList.js'

import { useUserStore } from 'src/stores/usuarios/user.store'
import { storeToRefs } from 'pinia'

const { getUser } = useUserStore()
const { user } = storeToRefs(useUserStore())
const menuWithAccess = ref([])
const verificaAcesso = (arr) => {
  const filtered = arr.filter((item) => {
    if (item.access) {
      if (
        item.access.some((cargo) => {
          const result = user.value.permissions_by_user.some((permission) => {
            return permission === cargo
          })
          return result
        }) ||
        user.value.is_superuser
      ) {
        if (item.submenu) {
          item.submenu = verificaAcesso(item.submenu)
        }
      } else {
        return false
      }
    } else {
      if (item.submenu) {
        item.submenu = verificaAcesso(item.submenu)
      }
    }
    return true
  })

  return filtered
}

onMounted(async () => {
  // const oi2 = await api.get('cliente/')
  await getUser()
})

watch(
  () => [user.value, menuList],
  () => {
    if (user.value.id && menuList) {
      menuWithAccess.value = verificaAcesso(menuList)
    }
  },
  {
    deep: true,
  }
)
</script>

<style lang="sass">

.home-page-container
  --header-bg: white
  --top-size: var(--header-base-height)
  margin-left: var(--Nv0-sidebar-width)
  // margin-top: var(--top-size)
  height:100vh

  .body--dark &
    background: rgb(var(--d-neutral-10))
</style>
