import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useFaseStore = defineStore('faseStore', () => {
  const fases = ref(false)
  const isLoading = ref(false)

  function setFases(value) {
    fases.value = value
  }

  async function getFases() {
    isLoading.value = true

    const { data, error } = await useAxios(URLS.fase, { method: 'GET' }, api)

    try {
      setFases(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  return {
    getFases,
    setFases,
    fases,
  }
})
