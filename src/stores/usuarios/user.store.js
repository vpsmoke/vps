import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useUsuarioStore } from './usuarios.store'

const { URLS } = api.defaults

export const useUserStore = defineStore('userStore', () => {
  const user = ref([])
  const isLoading = ref(false)
  const usuarios = useUsuarioStore()

  const userFoto = computed(() => {
    const item = usuarios.usuariosFoto.filter((u) => u.id === user.value.id)[0]
    const foto = item?.foto
    return foto
  })

  async function getUser() {
    isLoading.value = true
    user.value = []

    const { data, error } = await useAxios(
      URLS.user + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      console.log('USER', data.value)
      setUser(data.value);
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setUser(value) {
    user.value = value
  }

  return {
    getUser,
    setUser,
    user,
    userFoto,
  }
})
