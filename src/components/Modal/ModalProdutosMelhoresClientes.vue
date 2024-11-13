<template>
  <BaseModal :state="state" :open="open" :close="close" :btn-close="false">
    <template #content>
      <div class="p-24">
        <OTable
          :columns="columns"
          :rows="state.data.produtos_melhores_clientes"
          secondary
          separator="cell"
          class="mt-16"
          row-key="produto"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="produto" :props="props" class="!w-[100px]">
                {{ props.row.produto }}
              </q-td>

              <q-td key="quantidade" :props="props" class="!w-[100px]">
                {{ props.row.quantidade }}
              </q-td>

              <q-td key="valor">
                <div class="flex items-center">
                  <p class="mr-16">
                    R$
                    {{ GLOBAL.currencyIntlNotPrefix(props.row.valor) }}
                  </p>
                </div>
              </q-td>
            </q-tr>
          </template>
        </OTable>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import BaseModal from 'components/Modal/BaseModal.vue'
import OButton from 'src/components/Button/OButton.vue'
import useModal from 'src/composables/useModal'
import OTable from 'src/components/Table/OTable.vue'
import GLOBAL from 'src/utils/GLOBAL'
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
  sortBy: 'nome',
  descending: false,
})

function onDialogCancel() {
  close()
}

const columns = [
  {
    name: 'produto',
    label: 'Produto',
    align: 'left',
    field: 'produto',
  },
  {
    name: 'quantidade',
    label: 'Quantidade',
    align: 'left',
    field: 'quantidade',
  },
  {
    name: 'valor',
    label: 'Valor Total Gasto',
    align: 'left',
    field: 'valor',
  },
]

defineExpose({
  state,
  open,
  close,
  setState,
})
</script>
