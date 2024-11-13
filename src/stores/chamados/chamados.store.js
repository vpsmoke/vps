import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useChamadoStore = defineStore('chamadoStore', () => {
  const chamados = ref(false)
  const isLoading = ref(false)

  async function getChamado(filters = '') {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.chamado + '?concluidos=False' + filters,
      { method: 'GET' },
      api
    )

    try {
      setChamado(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setChamado(value) {
    chamados.value = value
  }

  async function createChamado(v) {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.chamado,
      {
        method: 'POST',
        data: { ...v, projeto: v.projeto.id },
      },
      api
    )

    try {
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  return {
    chamados,
    getChamado,
    createChamado,
    isLoading,
  }
})
