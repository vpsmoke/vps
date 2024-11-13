import { computed, onMounted, ref, watch } from 'vue'
import useUrlParams from './useUrlParams'

//
export default function useModal() {
  const { hasSearchParam, getSearchParam, setSearchParam, deleteSearchParam } =
    useUrlParams()

  const state = ref({
    id: null,
    name: '',
    open: false,
    data: {},
    header: {
      title: '',
      subtitle: '',
      icon: '',
    },
    style: {
      width: '76rem',
      height: '25rem',
    },
  })

  const isOpen = computed(() => state.value.open)
  const haveName = computed(() => state.value.name)

  function open(obj) {
    setState({
      open: true,
      ...obj,
    })
    console.log('abriu')
  }

  function close(obj) {
    setState({
      open: false,
      id: null,
      ...obj,
    })
    console.log('fechou')
  }

  function setState(obj) {
    state.value = {
      ...state.value,
      ...obj,
    }
  }

  watch(
    () => state.value.open,
    (isOpen) => {
      console.log(state.value.name)
      isOpen && haveName.value
        ? setSearchParam(state.value.name, state.value.id)
        : deleteSearchParam(state.value.name)
    }
  )

  onMounted(() => {
    if (!haveName.value) return

    if (hasSearchParam(state.value.name)) {
      open({ id: getSearchParam(state.value.name) })
    }
  })

  return { state, isOpen, open, close, setState }
}
