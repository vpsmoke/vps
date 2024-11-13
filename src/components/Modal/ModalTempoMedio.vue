<template>
  <BaseModal
    class="porVendedor"
    :state="state"
    :open="open"
    :close="close"
    :btn-close="false"
  >
    <template #content>
      <div class="p-24">
        <OTable
          :columns="columns"
          :rows="rows"
          secondary
          row-key="regiao"
          separator="cell"
          :loading="isLoading"
          :v-model:pagination="initialPagination"
          @request="getTempoMedio"
        >
          <template v-slot:top>
            <div
              class="flex flex-1 justify-between gap-32 items-center mb-16 w-full"
            >
              <OButton
                class="md2:w-full md2:mt-8 pointer-events-none"
                size="md"
                tertiary
                label="Últimos 30 dias:"
              />

              <OButton
                class="btnFilter md:w-full"
                size="md"
                secondary
                :disable="isLoading"
              >
                <q-icon
                  size="0.8rem"
                  name="svguse:/icons.svg#icon_filter_option"
                ></q-icon>
                Filtrar

                <q-popup-proxy
                  default
                  :breakpoint="280"
                  class="popup-proxy w-[25.4375rem] flex flex-col gap-16 flex-nowrap"
                >
                  <o-select
                    v-model="filter.bairro"
                    :options="optionsFilter.bairros"
                    multiple
                    emit-value
                    use-input
                    map-options
                    size="md"
                    behavior="menu"
                    label="Bairro"
                    :clearable="true"
                  ></o-select>

                  <div class="flex items-center justify-end gap-4 mt-8">
                    <o-button size="md" secondary @click="closeFilter"
                      >Cancelar</o-button
                    >
                    <o-button size="md" primary @click="getTempoMedio()"
                      >Consultar</o-button
                    >
                  </div>
                </q-popup-proxy>
              </OButton>
            </div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="regiao">
                {{ props.row.regiao }}
              </q-td>
              <q-td key="bairro">
                {{ props.row.bairro }}
              </q-td>

              <q-td key="media_tempo">{{ props.row.media_tempo }} </q-td>
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
import OButton from 'src/components/Button/OButton.vue'
import OSelect from 'src/components/Select/OSelect.vue'

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
const closeFilter = (e) => {
  document.querySelector('.porVendedor .btnFilter').click()
}
function onDialogCancel() {
  close()
}

const columns = [
  {
    name: 'regiao',
    label: 'Região',
    align: 'left',
    field: 'regiao',
  },

  {
    name: 'bairro',
    label: 'Bairro',
    align: 'left',
    field: 'bairro',
  },
  {
    name: 'media_tempo',
    label: 'Média de tempo entrega',
    align: 'left',
    field: 'media_tempo',
  },
]

const rows = ref([])

const getTempoMedio = async () => {
  const url = '/venda/media_tempo_entrega_por_bairro/'
  try {
    isLoading.value = true
    const { data } = await api.get(
      `${url}?&bairro__in=${filter.value.bairro || ''}`
    )
    console.log(data, 'adsdasdds')
    rows.value = data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const filter = ref({
  vendedor: '',
  origem: '',
  bairro: [],
  regiao: [],
})

const optionsFilter = ref({
  vendedores: [],
  bairros: [],
  regioes: [],
})

watch(
  () => state.value,
  (v) => {
    if (v.data) {
      getTempoMedio()
      optionsFilter.value = {
        vendedores: v.data.vendedores,
        bairros: v.data.bairros,
        regioes: v.data.regioes,
      }
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
