import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
// const BACKEND_URL = process.env.BACKEND_URL
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUserStore } from './user.store'

const { URLS } = api.defaults

export const useUsuarioStore = defineStore('usuarioStore', () => {
  const usuarios = ref([])
  const usuariosFoto = ref([])
  const isLoading = ref(false)

  async function getUsuarios() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.usuario + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      setUsuarios(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getUsuariosFoto() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.fotoUsuario + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      setUsuariosFoto(data.value.filter((i) => i.nome.trim()))
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setUsuariosFoto(value) {
    usuariosFoto.value = value
  }

  function setUsuarios(value) {
    usuarios.value = value
  }

  return {
    getUsuarios,
    getUsuariosFoto,
    setUsuarios,
    setUsuariosFoto,
    usuarios,
    usuariosFoto,
  }
})
