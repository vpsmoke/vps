<template>
  <q-layout
    class="resultadoClientePage"
    view="hHh lpR fFf"
    style="height: 100vh"
  >
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main class="m-40">
        <q-card class="p-24 flex flex-col gap-32 overflow-hidden">
          <div class="flex items-center gap-8 md:-mb-32">
            <q-icon
              size="1.5rem"
              name="svguse:/icons.svg#icon_search_title"
            ></q-icon>
            <p class="text-title-3">Resultado por cliente</p>
          </div>

          <!-- Graphic -->
          <section
            class="flex items-start -mt-32 md2:mt-0 flex-nowrap md2:flex-col-reverse md2:gap-24"
          >
            <div class="flex mt-32 md:flex-col gap-16 md:gap-0 md2:w-full">
              <div
                class="md2:mb-32 w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="">
                  <h1 class="text-caps-2 text-neutral-70">Unidades</h1>
                  <p class="mt-16 text-title-3">{{ indicators.unidade }}</p>
                </div>
              </div>

              <div
                class="md2:mb-32 w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="">
                  <h1 class="text-caps-2 text-neutral-70">Vendas</h1>
                  <p class="mt-16 text-title-3">{{ indicators.quantidade }}</p>
                </div>
              </div>

              <div
                class="md2:mb-32 w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="self-end">
                  <h1 class="text-caps-2 text-neutral-70">Valor</h1>
                  <div class="flex items-center gap-4">
                    <span class="text-headline-4 text-neutral-60">R$</span>
                    <p class="mt-16 text-title-3">{{ indicators.valor }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <o-table
            :filter="searchTable"
            class="sticky-header-table w-full flex-nowrap"
            :rows="rows"
            :columns="columns"
            row-key="name"
            secondary
            separator="cell"
            v-model:pagination="pagination"
          >
            <template v-slot:top-left>
              <o-input
                size="md"
                debounce="300"
                v-model="searchTable"
                placeholder="Search"
              >
                <template v-slot:append>
                  <o-button size="md" tertiary>
                    <q-icon name="search"
                  /></o-button>
                </template>
              </o-input>
            </template>

            <template v-slot:top-right>
              <div class="flex flex-1 justify-end gap-32 items-center">
                <OButton
                  @click="initExportTable"
                  class="sm:w-full w-max"
                  :class="[
                    loadingExcel ? 'opacity-70 pointer-events-none' : '',
                  ]"
                  size="md"
                  primary
                  text-color="white"
                  :loading="loadingExcel"
                  icon="svguse:/icons.svg#icon_xlsx"
                >
                  Exportar tabela
                </OButton>
                <OButton class="btnFilter md:w-full" size="md" secondary>
                  <q-icon
                    size="0.8rem"
                    name="svguse:/icons.svg#icon_filter_option"
                  ></q-icon>
                  Filtrar

                  <q-popup-proxy
                    default
                    class="popup-proxy w-[23.4375rem] flex flex-col gap-16 flex-nowrap"
                  >
                    <o-select
                      v-model="filterOptions.modelBairro"
                      :options="bairros"
                      multiple
                      emit-value
                      map-options
                      use-input
                      size="md"
                      behavior="menu"
                      label="Bairro"
                      :clearable="true"
                    ></o-select>
                    <o-select
                      v-model="filterOptions.modelVendedor"
                      :options="vendedores"
                      size="md"
                      behavior="menu"
                      emit-value
                      map-options
                      label="Vendedor"
                      :clearable="true"
                    ></o-select>

                    <div class="flex gap-16 flex-nowrap">
                      <o-input
                        label="De"
                        size="lg"
                        v-model="filterOptions.dataInicial"
                        placeholder="De"
                        type="date"
                        mask="DD-MM-YYYY"
                        append-size="32px"
                      >
                        <template v-slot:append>
                          <OButton rounded>
                            <q-icon
                              name="calendar_today"
                              class="cursor-pointer"
                            >
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="filterOptions.dataInicial"
                                  mask="YYYY-MM-DD"
                                >
                                  <div class="row items-center justify-end">
                                    <OButton
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </OButton>
                        </template>
                      </o-input>
                      <o-input
                        label="Até"
                        size="lg"
                        v-model="filterOptions.dataFinal"
                        placeholder="Até"
                        type="date"
                        mask="DD-MM-YYYY"
                        append-size="32px"
                      >
                        <template v-slot:append>
                          <OButton rounded>
                            <q-icon
                              name="calendar_today"
                              class="cursor-pointer"
                            >
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="filterOptions.dataFinal"
                                  mask="YYYY-MM-DD"
                                >
                                  <div class="row items-center justify-end">
                                    <OButton
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </OButton>
                        </template>
                      </o-input>
                    </div>
                    <div class="flex gap-16 flex-nowrap">
                      <o-input
                        label="Data de criação inicial"
                        size="lg"
                        v-model="filterOptions.dataCriacaoInicial"
                        placeholder="Data de criação inicial"
                        type="date"
                        mask="DD-MM-YYYY"
                        append-size="32px"
                      >
                        <template v-slot:append>
                          <OButton rounded>
                            <q-icon
                              name="calendar_today"
                              class="cursor-pointer"
                            >
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="filterOptions.dataCriacaoInicial"
                                  mask="YYYY-MM-DD"
                                >
                                  <div class="row items-center justify-end">
                                    <OButton
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </OButton>
                        </template>
                      </o-input>
                      <o-input
                        label="Data de criação final"
                        size="lg"
                        v-model="filterOptions.dataCriacaoFinal"
                        placeholder="Data de criação final"
                        type="date"
                        mask="DD-MM-YYYY"
                        append-size="32px"
                      >
                        <template v-slot:append>
                          <OButton rounded>
                            <q-icon
                              name="calendar_today"
                              class="cursor-pointer"
                            >
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="filterOptions.dataCriacaoFinal"
                                  mask="YYYY-MM-DD"
                                >
                                  <div class="row items-center justify-end">
                                    <OButton
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </OButton>
                        </template>
                      </o-input>
                    </div>
                    <div class="flex items-center justify-end gap-4 mt-8">
                      <o-button size="md" secondary @click="closeFilter"
                        >Cancelar</o-button
                      >
                      <o-button
                        size="md"
                        @click="getResultadosPorCliente"
                        primary
                        >Consultar</o-button
                      >
                    </div>
                  </q-popup-proxy>
                </OButton>
                <div class="flex gap-8 items-center">
                  <p>Mostrar</p>
                  <o-select
                    class="min-w-[4.625rem]"
                    v-model="pagination.rowsPerPage"
                    :options="optionsSelect"
                    size="md"
                    option-label
                    behavior="menu"
                    :clearable="true"
                  ></o-select>
                  <p>Linhas por página</p>
                </div>
              </div>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="cliente" :props="props">
                  {{ props.row.cliente }}
                </q-td>
                <q-td key="bairro" :props="props">
                  {{ props.row?.nome_bairro }}
                </q-td>
                <q-td key="regiao" :props="props">
                  {{ props.row?.nome_regiao }}
                </q-td>
                <q-td key="whatsapp" :props="props">
                  {{ props.row?.whatsapp }}
                </q-td>
                <q-td key="genero" :props="props">
                  {{ props.row?.genero }}
                </q-td>

                <q-td key="vendas" :props="props">
                  {{ props.row.vendas }}
                </q-td>
                <q-td key="quantidade" :props="props">
                  {{ props.row.quantidade }}
                </q-td>
                <q-td key="data_criacao" :props="props">
                  {{ GLOBAL.formatData(String(props.row.data_criacao)) }}
                </q-td>
                <q-td key="ultima_venda" :props="props">
                  <p
                    class="text-primary cursor-pointer hover:underline hover:text-primary-dark"
                    @click="
                      $router.push({
                        path: `${props.row.id_ultima_venda}/read}`,
                      })
                    "
                  >
                    {{ GLOBAL.formatData(String(props.row.ultima_venda)) }}
                  </p>
                </q-td>
                <q-td key="ultimo_vendedor" :props="props">
                  {{ props.row.nome_vendedor }}
                </q-td>

                <q-td key="pa" :props="props">
                  {{ Number(props.row.pa)?.toFixed(2) }}
                </q-td>
                <q-td key="ticket_medio" :props="props" :auto-width="true">
                  {{
                    GLOBAL.currencyBR(
                      Number(props?.row?.ticket_medio)?.toFixed(2)
                    )
                  }}
                </q-td>
                <!-- <q-td key="ultimo_vendedor" :props="props" :auto-width="true">
                  {{ props?.row?.ultimo_vendedor }}
                </q-td> -->
                <q-td key="valor" :props="props">
                  {{ GLOBAL.currencyBR(Number(props?.row?.valor)?.toFixed(2)) }}
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
import { ref, onMounted, nextTick, watch } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OTable from 'src/components/Table/OTable.vue'
import {
  columns as columnsExp,
  options as optionsExp,
  prepareRel,
  rows as rowsExp,
} from './data'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'

import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import moment from 'moment'

const { getVendedores, getRegiao, getBairros } = useContextStore()
const { vendedores, bairros } = storeToRefs(useContextStore())

const chartResultadoCliente = ref(null)
const optionsSelect = ref(['1', '10', '15', '20', '25', '50'])
const model = ref('')
const loadingExcel = ref(false)

const pagination = ref({
  rowsPerPage: 10,
})
const filterOptions = ref({
  modelVendedor: '',
  modelRegiao: '',
  modelBairro: [],
  dataInicial: '',
  dataFinal: '',
  dataCriacaoInicial: '',
  dataCriacaoFinal: '',
})

watch(
  () => filterOptions.value,
  () => {
    console.log(filterOptions)
  }
)

const closeFilter = (e) => {
  document.querySelector('.resultadoClientePage .btnFilter').click()
}
const dateValue = ref('')
const columns = ref(columnsExp)
const rows = ref([])
const options = ref(optionsExp)
const series = ref([])
const searchTable = ref('')

const indicators = ref({
  quantidade: 0,
  unidade: 0,
  valor: 0,
})

const prepareGraphic = (series) => {
  console.log(series)
  const names = [
    ...new Set(
      series.relatorio_clientes?.flatMap((venda) => {
        return venda.relatorio_cliente?.map((current) => current?.cliente?.nome)
      })
    ),
  ]
  const dataClientes = names.map((name) => {
    const data = series.relatorio_clientes?.flatMap((relCliente) => {
      return relCliente.relatorio_cliente
        ?.filter((current) => current?.cliente?.nome === name)
        ?.map((current) => current.valor_pedido)
    })
    return { name, data }
  })

  return dataClientes
}

const initExportTable = async () => {
  const filterSelected = filterOptions.value
  console.log(filterSelected)
  loadingExcel.value = true
  await prepareRel(
    `/cliente/relatorio_clientesv2/?search=${
      searchTable.value || ''
    }&data_inicial=${
      filterSelected.dataInicial
        ? moment(filterSelected.dataInicial).format('DD-MM-YYYY')
        : ''
    }&data_final=${
      filterSelected.dataFinal
        ? moment(filterSelected.dataFinal).format('DD-MM-YYYY')
        : filterSelected.dataInicial
        ? moment().format('DD-MM-YYYY')
        : ''
    }&data_criacao_inicial=${
      filterSelected.dataCriacaoInicial
        ? moment(filterSelected.dataCriacaoInicial).format('DD-MM-YYYY')
        : ''
    }&data_criacao_final=${
      filterSelected.dataCriacaoFinal
        ? moment(filterSelected.dataCriacaoFinal).format('DD-MM-YYYY')
        : ''
    }&vendedor=${filterSelected.modelVendedor || ''}&cliente__bairro=${
      filterSelected.modelBairro
    }`,
    'Resultado_por_cliente'
  )
  loadingExcel.value = false
}

const getResultadosPorCliente = async () => {
  const filterSelected = filterOptions.value

  const obj = {
    data_inicial: filterSelected.dataInicial
      ? moment(filterSelected.dataInicial).format('DD-MM-YYYY')
      : '',
    data_final: filterSelected.dataFinal
      ? moment(filterSelected.dataFinal).format('DD-MM-YYYY')
      : filterSelected.dataInicial
      ? moment().format('DD-MM-YYYY')
      : '',
    data_criacao_inicial: filterSelected.dataCriacaoInicial
      ? moment(filterSelected.dataCriacaoInicial).format('DD-MM-YYYY')
      : '',
    data_criacao_final: filterSelected.dataCriacaoFinal
      ? moment(filterSelected.dataCriacaoFinal).format('DD-MM-YYYY')
      : '',
    vendedor: filterSelected.modelVendedor || '',
    bairro: filterSelected.modelBairro || '',
  }

  const query = GLOBAL.generateStringFilterFromObject(obj)

  const { data } = await api.get(`/cliente/relatorio_clientesv2/${query}`)
  console.log(data.relatorio_tabela[0])
  rows.value = data.relatorio_tabela[0].map((arr) => ({
    id: arr[0],
    cliente: arr[1],
    vendas: arr[2],
    quantidade: arr[3],
    data_criacao: arr[17],
    valor: arr[4],
    ticket_medio: arr[5],
    pa: arr[6],
    bairro: arr[7],
    whatsapp: arr[9],
    genero: arr[8],
    ultima_venda: arr[10],
    id_ultima_venda: arr[11],
    id_ultimo_vendedor: arr[12],
    nome_vendedor: arr[14],
    apelido_vendedor: arr[13],
    nome_bairro: arr[15],
    nome_regiao: arr[16],
  }))

  const somatorios = data.relatorio_somatorio.flat()[0]
  indicators.value.quantidade = somatorios[0]
  indicators.value.unidade = somatorios[1]
  indicators.value.valor = GLOBAL.currencyBR(somatorios[2])
}

onMounted(async () => {
  await getVendedores()
  await getBairros()
  await getResultadosPorCliente()
  // getClientes()
})
</script>

<style lang="sass">
.resultadoClientePage
  .q-expansion-item__container .q-item__section--side
    display: none

  .accordion .q-focus-helper
    display: none

  .q-table__card .q-table__middle
    flex: initial

  th
    border-color: transparent
  .sticky-header-table
    height: auto
  .q-table__control:nth-child(2)
    display: none

  @media (max-width: 768px)
    .q-table-control
        width: 100%
        margin-bottom: 8px
    .q-table__control
      width: 100%
</style>
