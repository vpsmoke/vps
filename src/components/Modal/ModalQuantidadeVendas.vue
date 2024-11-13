<template>
  <BaseModal :state="state" :open="open" :close="close" :btn-close="false">
    <template #content>
      <div class="p-24">
        <h3 class="text-headline-2">Produtos</h3>
        <OTable
          :columns="columns"
          :rows="rows[0]"
          secondary
          separator="cell"
          class="mt-16"
          :loading="isLoading"
          :pagination="initialPagination"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nome">
                {{ props.row.nome }}
              </q-td>

              <q-td key="quantidade">
                {{ props.row.total_vendido }}
              </q-td>
              <q-td key="estoque">
                {{ props.row.quantidade_estoque }}
              </q-td>
              <q-td key="valor_total">
                R$ {{ GLOBAL.currencyIntlNotPrefix(props.row.valor_total) }}
              </q-td>
            </q-tr>
          </template>
        </OTable>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from 'components/Modal/BaseModal.vue'
import useModal from 'src/composables/useModal'
import OTable from 'src/components/Table/OTable.vue'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'

const modalProporSolucao = useModal({
  header: {
    hidden: true,
  },
  style: { width: '36.25rem', minHeight: '25rem' },
})

const isLoading = ref(false)

const { state, open, close, setState } = modalProporSolucao

const initialPagination = ref({
  page: 1,
  rowsPerPage: 10,
  descending: false,
})

function onDialogCancel() {
  close()
}

const columns = [
  {
    name: 'nome',
    label: 'Nome',
    align: 'left',
    field: 'nome',
  },

  {
    name: 'quantidade',
    label: 'Quantidade',
    align: 'left',
    field: 'quantidade',
  },
  {
    name: 'estoque',
    label: 'Estoque',
    align: 'left',
    field: 'estoque',
  },
  {
    name: 'total',
    label: 'Valor Total',
    align: 'left',
    field: 'total',
  },
]

const isMaisVendidos = computed(
  () => state.value.data.situation === 'mais_vendidos'
)

const rows = ref([])

const getQuantidadeVendas = async () => {
  const url = isMaisVendidos.value
    ? '/produto/top_produtos_mais_vendidos/'
    : '/produto/top_produtos_menos_vendidos/'
  try {
    isLoading.value = true
    const { data } = await api.get(url)
    rows.value = Object.values(data)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => state.value,
  (v) => {
    if (v.data) {
      getQuantidadeVendas()
    }
  },
  {
    deep: true,
  }
)

defineExpose({
  state,
  open,
  close,
  setState,
})
</script>
