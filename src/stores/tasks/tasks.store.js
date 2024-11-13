import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const { URLS } = api.defaults

export const useTaskStore = defineStore('taskstore', () => {
  const isLoading = ref(false)
  const tasks = ref([])
  const tasksChamado = ref([])

  const tasksChamadoConcluido = computed(() =>
    tasksChamado.value.filter((t) => t.status === 'Concluído')
  )
  const tasksChamadoPendente = computed(() =>
    tasksChamado.value.filter(
      (t) => t.status === 'Em andamento' || t.status === 'Aguardando'
    )
  )

  async function getTasks(filtro = '') {
    isLoading.value = true

    const { data, error } = await useAxios(
      URLS.task + '?no_loading' + filtro,
      { method: 'GET' },
      api
    )
    try {
      if (filtro) setTasksChamado(data.value.results)
      else setTasks(data.value.results)

      return data.value.results
    } catch (e) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  function setTasks(value) {
    tasks.value = value
  }
  function setTasksChamado(value) {
    tasksChamado.value = value
  }

  return {
    getTasks,
    setTasks,
    tasks,
    tasksChamado,
    tasksChamadoConcluido,
    tasksChamadoPendente,
  }
})
