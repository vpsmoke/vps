// <!-- <q-breadcrumbs-el label="Home" to="/" />
// <q-breadcrumbs-el
//   label="Kanban"
//   :exact="true"
//   :to="{ name: 'kanban' }"
// /> -->

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default function useBreadcrumbs() {
  const router = useRouter()
  const breadcrumbs = ref([])

  onMounted(() => {})

  return { breadcrumbs }
}
