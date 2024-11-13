import { defineStore } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useVisaoExpandida = defineStore('visaoExpandida', () => {
  const visaoExpandida = ref(true)

  onMounted(() => {
    if (LocalStorage.has('visaoExpandida')) {
      visaoExpandida.value = LocalStorage.getItem('visaoExpandida')
    } else {
      LocalStorage.set('visaoExpandida', visaoExpandida.value)
    }
  })

  function initDarkMode() {
    if (LocalStorage.has('visaoExpandida')) {
      visaoExpandida.value = LocalStorage.getItem('visaoExpandida')
    } else {
      LocalStorage.set('visaoExpandida', visaoExpandida.value)
    }
  }

  watch(visaoExpandida, (newX) => {
    LocalStorage.set('visaoExpandida', visaoExpandida.value)
  })

  return { visaoExpandida }
})
