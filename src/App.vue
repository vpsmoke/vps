<template>
  <!--
    EX : usar transition na router view e ter acesso a instancia da page
    <router-view v-slot="{ Component }">
    <transition :name="$route.meta.transitionName || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view> -->
  <RouterView></RouterView>
</template>

<script>
import { defineComponent, watch, ref, provide, onMounted } from 'vue'
// import emitter from 'src/boot/emitter'

import 'src/css/cores.sass'
import 'src/css/quasar/@index.sass'
import 'src/css/body.sass'
import 'src/css/tailwind.css'
import 'src/css/pages/DesignSystem.sass'
import 'src/css/vendor/materialSymbolsRounded.sass'
import 'src/css/vendor/apexCharts.sass'
import 'maz-ui/css/main.css'
// import '@/css/path_to_your_main_file.css'

import { Notify, LocalStorage, Dark } from 'quasar'
import { storeToRefs } from 'pinia'

Notify.registerType('error', {
  icon: 'warning',
  iconColor: 'white',
  progress: true,
  classes: 'notify-error',
  timeout: 2000,
})

export default defineComponent({ name: 'App' })
</script>

<script setup>
import { useDarkMode } from 'src/stores/darkMode'
// import { useUserStore } from 'src/stores/usuarios/user.store'

const { darkMode } = storeToRefs(useDarkMode())

watch(darkMode, (newX) => {
  LocalStorage.set('darkMode', darkMode.value)
  Dark.set(darkMode.value)
})

// EX Store para buscar e armazenar dados do usuario
// const { user } = storeToRefs(useUserStore())
// const { getUser } = useUserStore()
// onMounted(() => {
//   getUser()
// })
// provide('user', user)
</script>

<style lang="sass">


.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0



/* width */
::-webkit-scrollbar
  width: 8px

/* Track */
::-webkit-scrollbar-track
  background: rgba(var(--neutral-10),1)

/* Handle */
::-webkit-scrollbar-thumb
  background: rgba(var(--neutral-100),0.2)
  border-radius: 8px
</style>
