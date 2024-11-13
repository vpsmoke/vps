import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useProjetoStore = defineStore('projetoStore', () => {
  const projetos = ref([])
  const subProjetos = ref([])
  const isLoading = ref(false)

  const projetoAndSubProjetoOptions = computed(() =>
    subProjetos.value.concat(projetos.value)
  )

  function setProjetos(value) {
    projetos.value = value
  }

  function setSubProjetos(value) {
    subProjetos.value = value
  }

  async function getProjetos() {
    isLoading.value = true
    const { data, error } = await useAxios(
      URLS.projeto + '?no_loading',
      { method: 'GET' },
      api
    )

    try {
      setProjetos(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  async function getSubProjetos() {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.subprojeto,
      { method: 'GET' },
      api
    )

    try {
      setSubProjetos(data.value)
      return data.value
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  return {
    getProjetos,
    getSubProjetos,
    setProjetos,
    setSubProjetos,
    projetos,
    subProjetos,
    projetoAndSubProjetoOptions,
  }
})
