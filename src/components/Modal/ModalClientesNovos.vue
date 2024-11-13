<template>
  <BaseModal :state="state" :open="open" :close="close" :btn-close="false">
    <template #content>
      <div class="p-24">
        <h3 class="text-headline-2">{{ state.data.nome_vendedor }}</h3>
        <OTable
          :columns="columns"
          :rows="state.data.clientes_novos"
          secondary
          separator="cell"
          class="mt-16"
          row-key="name"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import BaseModal from 'components/Modal/BaseModal.vue'
import useModal from 'src/composables/useModal'
import OTable from 'src/components/Table/OTable.vue'
import { api } from 'src/boot/axios'

const modalProporSolucao = useModal({
  header: {
    hidden: true,
  },
  style: { width: '36.25rem', minHeight: '25rem' },
})

const { state, open, close, setState } = modalProporSolucao

const initialPagination = ref({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
  sortBy: 'nome_cliente',
  descending: false,
})

function onDialogCancel() {
  close()
}

const columns = [
  {
    name: 'nome_cliente',
    label: 'Nome',
    align: 'left',
    field: 'nome_cliente',
  },
  {
    name: 'whatsapp',
    label: 'Telefone',
    align: 'left',
    field: 'whatsapp',
  },
]

const clientesNovos = ref([])
// watch(
//   () => [modelViewPerPageAllSales.value],
//   async () => {
//     initialPaginationAllVendas.value.rowsPerPage =
//       modelViewPerPageAllSales.value || 5
//     getAllSales({ pagination: initialPaginationAllVendas.value })
//   }
// )

const getClientesNovos = async (props) => {
  const { page, rowsPerPage } = props.pagination

  const { data } = await api.get(
    `/venda/?vendedor=${1}&page=${page}&limit=${rowsPerPage}`
  )
  const col = initialPagination.value.sortBy
  const sortFn = initialPagination.value.descending
    ? (a, b) => (a[col] > b[col] ? -1 : a[col] < b[col] ? 1 : 0)
    : (a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0)
  clientesNovos.value = data.results.sort(sortFn)

  initialPagination.value = {
    ...initialPagination.value,
    rowsNumber: data.count,
    page,
  }

  return data
}

defineExpose({
  state,
  open,
  close,
  setState,
})
</script>
