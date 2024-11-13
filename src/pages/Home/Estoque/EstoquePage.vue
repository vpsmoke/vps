<template>
  <q-layout class="EstoquePage" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main
        class="m-40 md2:mx-0 flex md2:items-center md2:w-full flex-col gap-24"
      >
        <!-- Saldo em caixa -->
        <q-card
          class="p-24 md2:max-w-[90vw] md2:w-full md:items-center flex flex-col gap-24 overflow-hidden"
        >
          <div
            class="flex items-center md:w-full justify-between md:flex-col md:gap-16"
          >
            <div class="flex items-center gap-8">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_package_box"
              ></q-icon>
              <p class="text-title-3">Estoque</p>
            </div>

            <OButton class="btnFilter md2:!w-full" size="md" secondary>
              <q-icon
                size="0.8rem"
                name="svguse:/icons.svg#icon_filter_option"
              ></q-icon>
              Filtrar

              <q-popup-proxy
                default
                breakpoint="280"
                class="popup-proxy w-[23.4375rem] flex flex-col gap-16"
              >
                <o-select
                  v-model="filterOptions.fabricante"
                  :options="fabricantes"
                  size="md"
                  emit-value
                  map-options
                  behavior="menu"
                  label="Fabricante"
                  :clearable="true"
                ></o-select>

                <o-select
                  v-model="filterOptions.sabor"
                  :options="sabores"
                  size="md"
                  emit-value
                  use-input
                  map-options
                  behavior="menu"
                  label="Sabor"
                  :clearable="true"
                ></o-select>
                <!-- @inputSearch="(e) => handleChangeInputSearch(e, 'sabores')" -->
                <div class="flex items-center justify-end gap-4 mt-8">
                  <o-button size="md" secondary @click="closeFilter"
                    >Cancelar</o-button
                  >
                  <o-button
                    size="md"
                    @click="onRequest({ pagination: initialPagination })"
                    primary
                    >Consultar</o-button
                  >
                </div>
              </q-popup-proxy>
            </OButton>
          </div>
          <div class="flex gap-16 items-start md2:flex-col flex-nowrap w-full">
            <introductoryCard :cards="cards" />
          </div>
          <!--  -->
          <o-table
            class="w-full flex-nowrap"
            :filter="filter"
            :rows="rows"
            :columns="columns"
            row-key="name"
            secondary
            separator="cell"
            v-model:pagination="initialPagination"
            @request="onRequest"
          >
            <!-- v-model:pagination="initialPagination" -->
            <!-- @request="onRequest" -->
            <template v-slot:top-left>
              <o-input
                size="md"
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <o-button size="md" tertiary>
                    <q-icon name="search"
                  /></o-button>
                </template>
              </o-input>
            </template>

            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  @click="(e) => handleSort(col.name)"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:top-right>
              <div class="flex gap-24 items-center">
                <OButton
                  primary
                  :disabled="rows.length > 0 ? false : true"
                  @click="initExportTable"
                  class="text-white"
                  :class="[
                    loadingExcel ? 'opacity-70 pointer-events-none' : '',
                  ]"
                  :loading="loadingExcel"
                >
                  <q-icon
                    size="1.5rem"
                    name="svguse:/icons.svg#icon_xlsx"
                  ></q-icon>
                  Download
                </OButton>
                <div class="flex gap-8 items-center">
                  <p>Mostrar</p>
                  <o-select
                    v-model="initialPagination.rowsPerPage"
                    class="min-w-[4.625rem]"
                    :options="optionsSelect"
                    size="md"
                    option-label
                    behavior="menu"
                    :clearable="true"
                  ></o-select>
                  <p>Linhas por páginas</p>
                </div>
              </div>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="fabricante" :props="props">
                  {{ props.row.fabricante }}
                </q-td>
                <q-td key="sabor" :props="props">
                  {{ props.row.sabor }}
                </q-td>

                <q-td key="puff" :props="props">
                  {{ props.row.puffs }}
                </q-td>
                <q-td key="status" :props="props">
                  <o-badge
                    :class="props.row.status ? '' : 'hidden'"
                    square
                    size="lg"
                    :badge="false"
                    :color="defineColor(props.row.status)"
                  >
                    <template v-slot:content>{{ props.row.status }}</template>
                  </o-badge>
                </q-td>

                <q-td key="valor_compra" :props="props">
                  {{
                    GLOBAL.currencyBR(
                      Number(props.row?.valor_compra).toFixed(2)
                    )
                  }}
                </q-td>

                <q-td key="valor_venda" :props="props">
                  {{
                    GLOBAL.currencyBR(Number(props.row?.valor_venda).toFixed(2))
                  }}
                </q-td>

                <q-td key="quantidade" :props="props">
                  {{ props.row.quantidade }}
                </q-td>
              </q-tr>
            </template>
          </o-table>
        </q-card>
      </main>
    </q-scroll-area>
  </q-layout>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OTable from 'src/components/Table/OTable.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OInput from 'src/components/Input/OInput.vue'
import * as XLSX from 'xlsx'
import introductoryCard from './components/introductoryCard.vue'
import { columns, prepareRel, rows as rowsExp } from './data'
import { ref, onMounted, watch } from 'vue'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'
import OBadge from 'src/components/Badge/OBadge.vue'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import { QPopupProxy, exportFile, Notify } from 'quasar'
const { getFabricantes, getSabores } = useContextStore()
const { fabricantes, sabores } = storeToRefs(useContextStore())
const loading = ref(false)
const optionsSelect = ref(['10', '25', '50', '100', '150', '200'])
const rows = ref([])
const filter = ref('')
const loadingExcel = ref(false)

const initialPagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'nome_cliente',
  descending: false,
})

const handleSort = (col) => {
  initialPagination.value.descending = !initialPagination.value.descending
  initialPagination.value.sortBy = col
}

function defineColor(status) {
  switch (status) {
    case 'Estoque Disponivel':
      return 'var(--alert-success)'
    case 'Estoque Baixo':
      return 'var(--alert-warning)'

    default:
      return ''
  }
}

// watch(
//   () => [initialPagination.value.rowsPerPage],
//   async () => {
//     console.log('initial', initialPagination.value)
//     onRequest({ pagination: initialPagination.value })
//   }
// )

const tableData = ref([])

const filterOptions = ref({
  sabor: '',
  fabricante: '',
})

const cards = ref([
  {
    title: 'Disponíveis',
  },
  {
    title: 'Estoque baixo',
  },
  {
    title: 'Fora de estoque',
  },
])

const closeFilter = () => {
  document.querySelector('.btnFilter').click()
}

// const exportTable = async () => {
//   const { data } = await api.get(
//     `/estoque/relatorio_estoques/?search=${filter.value || ''}&fabricante=${
//       filterOptions.value.fabricante || ''
//     }&sabor=${filterOptions.value.sabor || ''}&page_size=${
//       initialPagination.value.rowsNumber
//     }`
//   )
//   const cel = rowsExp(data.lista_estoque)

//   const ws = XLSX.utils.json_to_sheet(cel)
//   const wb = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(wb, ws, 'estoque')
//   XLSX.writeFile(wb, 'estoque.xlsx')
//   loading.value = false
// }

const initExportTable = async () => {
  loadingExcel.value = true
  await prepareRel(
    `/estoque/relatorio_estoques/?search=${filter.value || ''}&fabricante=${
      filterOptions.value.fabricante || ''
    }&sabor=${filterOptions.value.sabor || ''}&page_size=${
      initialPagination.value.rowsNumber
    }`,
    'estoque_page'
  )
  loadingExcel.value = false
}

const onRequest = async (props) => {
  const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
  const { data } = await api.get(
    `/estoque/relatorio_estoques/?search=${filter.value || ''}&fabricante=${
      filterOptions.value.fabricante || ''
    }&sabor=${
      filterOptions.value.sabor || ''
    }&page_size=${rowsPerPage}&page=${page}`
  )

  cards.value = [
    {
      title: 'Disponíveis',
      valor: data.estoque_disponivel,
    },
    {
      title: 'Estoque baixo',
      valor: data.estoque_baixo,
    },
    {
      title: 'Fora de estoque',
      valor: data.fora_estoque,
    },
  ]

  initialPagination.value = {
    ...initialPagination.value,
    rowsNumber: data.count,
    page,
  }

  const col = initialPagination.value.sortBy
  const sortFn = initialPagination.value.descending
    ? (a, b) => (a[col] > b[col] ? -1 : a[col] < b[col] ? 1 : 0)
    : (a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0)
  rows.value = rowsExp(data.lista_estoque.sort(sortFn))
}

onMounted(async () => {
  await getFabricantes({ page_size: '999' })
  await getSabores({ page_size: '999' })
  onRequest({
    pagination: initialPagination.value,
  })
})
</script>

<style lang="sass">
.EstoquePage
  @media(max-width: 768px)
    .q-table__top
      gap: 16px
      width: 100%
      .q-table-control
        width: 100%
  .q-table__control:nth-child(2)
    display: none
</style>
