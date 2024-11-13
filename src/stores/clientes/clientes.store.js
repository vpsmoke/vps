import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useClientesStore = defineStore('clientesStore', () => {
  const clientes = ref([])
  const isLoading = ref(false)

  async function getClientes() {
    isLoading.value = true

    const { data, error } = await useAxios(URLS.cliente, { method: 'GET' }, api)

    try {
      setClientes(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setClientes(value) {
    clientes.value = value
  }

  return {
    getClientes,
    setClientes,
    clientes,
  }
})
