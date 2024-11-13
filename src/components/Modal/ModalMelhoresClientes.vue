<template>
  <BaseModal :state="state" :open="open" :close="close" :btn-close="false">
    <template #content>
      <div class="p-24">
        <q-tabs
          v-model="tabMelhoresClientes"
          class="text-neutral-100 dark:text-white/90 text-paragraph-1 w-max"
          dense
          active-color="primary-pure"
        >
          <q-tab name="geral" label="Geral"></q-tab>
          <q-tab name="mensal" label="Mensal"></q-tab>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabMelhoresClientes" animated>
          <q-tab-panel name="geral">
            <OTable
              :columns="columns"
              :rows="state.data.melhores_clientes.geral"
              secondary
              separator="cell"
              class="mt-16"
              row-key="id"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="nome" :props="props" class="!w-[100px]">
                    {{ props.row.nome }}
                  </q-td>

                  <q-td key="whatsapp" :props="props" class="!w-[100px]">
                    {{
                      props.row.whatsapp
                        ? GLOBAL.maskNumberPhone(props.row.whatsapp)
                        : ' - '
                    }}
                  </q-td>

                  <q-td key="bairro" :props="props" class="!w-[100px]">
                    {{ props.row.bairro }}
                  </q-td>

                  <q-td key="total_gasto">
                    <div class="flex items-center justify-evenly">
                      <p class="mr-16">
                        R$
                        {{
                          GLOBAL.currencyIntlNotPrefix(props.row.total_gasto)
                        }}
                      </p>

                      <OButton
                        :disable="!props.row.id"
                        secondary
                        dense
                        icon="svguse:/icons.svg#icon_search"
                        @click="openModalMelhoresClientes(props.row)"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </OTable>
          </q-tab-panel>
          <q-tab-panel name="mensal">
            <OTable
              :columns="columns"
              :rows="state.data.melhores_clientes.mensal"
              secondary
              separator="cell"
              class="mt-16"
              row-key="id"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="nome" :props="props" class="!w-[100px]">
                    {{ props.row.nome }}
                  </q-td>

                  <q-td key="whatsapp" :props="props" class="!w-[100px]">
                    {{
                      props.row.whatsapp
                        ? GLOBAL.maskNumberPhone(props.row.whatsapp)
                        : ' - '
                    }}
                  </q-td>

                  <q-td key="bairro" :props="props" class="!w-[100px]">
                    {{ props.row.bairro }}
                  </q-td>

                  <q-td key="total_gasto">
                    <div class="flex items-center justify-evenly">
                      <p class="mr-16">
                        R$
                        {{
                          GLOBAL.currencyIntlNotPrefix(props.row.total_gasto)
                        }}
                      </p>

                      <OButton
                        secondary
                        dense
                        icon="svguse:/icons.svg#icon_search"
                        @click="openModalMelhoresClientes(props.row)"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </OTable>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </template>
  </BaseModal>
  <ModalProdutosMelhoresClientes ref="modalProdutosMelhoresClientesRef" />
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import BaseModal from 'components/Modal/BaseModal.vue'
import OButton from 'src/components/Button/OButton.vue'
import useModal from 'src/composables/useModal'
import OTable from 'src/components/Table/OTable.vue'
import GLOBAL from 'src/utils/GLOBAL'
import ModalProdutosMelhoresClientes from 'src/components/Modal/ModalProdutosMelhoresClientes.vue'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
const { getProdutosMelhoresClientes } = useContextStore()
const { produtosMelhoresClientes } = storeToRefs(useContextStore())
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

const modalProdutosMelhoresClientesRef = ref(null)

const openModalMelhoresClientes = async (cliente) => {
  await getProdutosMelhoresClientes(cliente.id, tabMelhoresClientes.value)
  modalProdutosMelhoresClientesRef.value.setState({
    header: {
      hidden: false,
      title: `Produtos - ${cliente.nome}`,
    },

    style: { width: '36.25rem', minHeight: '25rem' },

    data: {
      produtos_melhores_clientes: produtosMelhoresClientes.value.produtos,
    },
  })
  modalProdutosMelhoresClientesRef.value.open()
}

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
    name: 'whatsapp',
    label: 'Telefone',
    align: 'center',
    field: 'whatsapp',
  },
  {
    name: 'bairro',
    label: 'Bairro',
    align: 'left',
    field: 'bairro',
  },
  {
    name: 'valor_total',
    label: 'Valor Total Gasto',
    align: 'left',
    field: 'valor_total',
  },
]

const tabMelhoresClientes = ref('geral')

defineExpose({
  state,
  open,
  close,
  setState,
})
</script>
