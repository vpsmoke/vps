<template>
  <q-layout class="porProduto" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main class="m-40">
        <q-card class="p-24 flex flex-col gap-32 overflow-hidden">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-8 md:-mb-32">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_search_title"
              ></q-icon>
              <p class="text-title-3 !flex-nowrap md:!text-20">
                Desempenho por produto
              </p>
            </div>
            <div class="flex items-center gap-8">
              <OButton
                class="md2:w-full md2:mt-8 pointer-events-none"
                size="md"
                tertiary
                label="Últimos 30 dias:"
              />

              <OButton
                class="md2:w-full md2:mt-8"
                size="md"
                secondary
                label="Mais vendidos"
                @click="openModalQtdVendas('mais_vendidos')"
              />
              <OButton
                class="md2:w-full md2:mt-8"
                size="md"
                secondary
                label="Menos vendidos"
                @click="openModalQtdVendas('menos_vendidos')"
              />
            </div>
          </div>

          <div class="w-full flex justify-end gap-8 mt-16">
            <OButton class="btnFilter md2:w-full md2:mt-8" size="md" secondary>
              <q-icon
                size="0.8rem"
                name="svguse:/icons.svg#icon_filter_option"
              ></q-icon>
              Filtrar

              <q-popup-proxy
                default
                breakpoint="280"
                class="popup-proxy w-[23.4375rem] flex flex-col gap-16 flex-nowrap"
              >
                <o-select
                  v-model="filterDate.tipo_filtro"
                  :options="selectPeriodo"
                  emit-value
                  map-options
                  size="md"
                  behavior="menu"
                  label="Agrupar por período"
                  :clearable="true"
                ></o-select>
                <div class="flex gap-16">
                  <o-input
                    label="Data Venda Inicial"
                    size="lg"
                    v-model="filterDate.dataInicial"
                    placeholder="De"
                    type="date"
                    mask="DD-MM-YYYY"
                    append-size="32px"
                  >
                    <template v-slot:append>
                      <OButton rounded>
                        <q-icon name="calendar_today" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="filterDate.dataInicial"
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
                    label="Data Venda Final"
                    size="lg"
                    v-model="filterDate.dataFinal"
                    placeholder="Até"
                    type="date"
                    mask="DD-MM-YYYY"
                    append-size="32px"
                  >
                    <template v-slot:append>
                      <OButton rounded>
                        <q-icon name="calendar_today" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="filterDate.dataFinal"
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
                  <o-button size="md" primary @click="getDataWithFilters"
                    >Consultar</o-button
                  >
                </div>
              </q-popup-proxy>
            </OButton>
            <OButton
              @click="resetFilter"
              class="md2:w-full"
              size="md"
              secondary
            >
              Limpar filtro
            </OButton>
          </div>
          <!-- Graphic -->
          <section
            class="flex items-start -mt-32 md2:mt-0 flex-nowrap md2:flex-col-reverse md2:gap-24"
          >
            <div class="flex-1 md2:w-full relative">
              <div
                @click="clearChart"
                class="flex justify-end items-center absolute top-8 right-24 cursor-pointer z-[99999999999999999]"
              >
                <p class="text-12">Resetar gráfico</p>
              </div>
              <apexchart
                id="chartPorProduto"
                ref="chartPorProduto"
                type="bar"
                height="350"
                :options="options"
                :series="series"
                v-if="series.length"
              ></apexchart>
              <!-- <div id="chartPorProduto"></div> -->
            </div>

            <div
              class="flex mt-32 flex-col gap-16 md:!flex md:!flex-col md2:grid md2:grid-cols-3 md2:w-full"
            >
              <!-- 1º card -->
              <div
                class="w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="">
                  <h1 class="text-caps-2 text-neutral-70">Unidades</h1>
                  <p class="mt-16 text-title-3">
                    {{ indicadores.qtd_unidades || '0' }}
                  </p>
                </div>
              </div>
              <!-- 2º card -->
              <div
                class="w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="">
                  <h1 class="text-caps-2 text-neutral-70">Vendas</h1>
                  <p class="mt-16 text-title-3">
                    {{ indicadores.qtd_vendas || '0' }}
                  </p>
                </div>
              </div>
              <!-- 3º card -->
              <div
                class="w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="self-end">
                  <h1 class="text-caps-2 text-neutral-70">Valor</h1>
                  <div class="flex items-center gap-4">
                    <span class="text-headline-4 text-neutral-60">R$</span>
                    <p class="mt-16 text-title-3">
                      {{ GLOBAL.currencyNotPrefix(indicadores.valor_total) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- separator -->
          <div class="relative -mt-20">
            <div class="absolute w-screen -left-64 h-1 bg-neutral-100/10"></div>
          </div>

          <!-- Filter -->

          <div class="flex flex-col">
            <!-- <div class="flex mb-16 justify-between items-center w-full">
              <o-input
                class="w-[22rem] md2:w-full"
                label="Pesquise por nome do fabricante ou produto..."
                size="md"
                v-model="search"
                type="text"
                append-size="32px"
              >
                <template v-slot:prepend>
                  <OButton rounded class="-ml-8">
                    <q-icon
                      size="1.5rem"
                      name="svguse:/icons.svg#icon_search"
                    ></q-icon>
                  </OButton>
                </template>
              </o-input>
              <OButton
                class="btnFilter md2:w-full md2:mt-8 md2:mb-16 flex-nowrap"
                size="md"
                secondary
              >
                <q-icon
                  size="0.8rem"
                  name="svguse:/icons.svg#icon_filter_option"
                ></q-icon>
                Filtrar

                <q-popup-proxy
                  default
                  breakpoint="280"
                  class="popup-proxy w-[23.4375rem] flex flex-col gap-16 flex-nowrap"
                >
                  <o-select
                    v-model="modelPeriodo"
                    :options="selectPeriodo"
                    size="md"
                    behavior="menu"
                    label="Agrupar por período"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="modelContabil"
                    :options="selectContabil"
                    size="md"
                    behavior="menu"
                    label="Conta Contábil"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="modelBanco"
                    :options="selectBanco"
                    size="md"
                    behavior="menu"
                    label="Banco"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="modelUnidade"
                    :options="selectUnidade"
                    size="md"
                    behavior="menu"
                    label="Unidade"
                    :clearable="true"
                  ></o-select>

                  <div class="flex gap-16 flex-nowrap">
                    <o-input
                      label="De"
                      size="lg"
                      v-model="dataInicial"
                      placeholder="De"
                      type="date"
                      mask="DD-MM-YYYY"
                      append-size="32px"
                    >
                      <template v-slot:append>
                        <OButton rounded>
                          <q-icon name="calendar_today" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="dataInicial" mask="YYYY-MM-DD">
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
                      v-model="dataFinal"
                      placeholder="Até"
                      type="date"
                      mask="DD-MM-YYYY"
                      append-size="32px"
                    >
                      <template v-slot:append>
                        <OButton rounded>
                          <q-icon name="calendar_today" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="dataFinal" mask="YYYY-MM-DD">
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
                    <o-button size="md" primary>Consultar</o-button>
                  </div>
                </q-popup-proxy>
              </OButton>
            </div> -->

            <o-accordion
              v-for="item in produtosResponse"
              :key="item.fabricante.id"
              switch-toggle-side
              class="accordion sm:!w-[67vw] !px-0 last:rounded-b-md bg-neutral-20 flex items-center w-full border border-neutral-100/10 dark:border-white/10"
            >
              <template v-slot:header>
                <div
                  class="titles-accordion grid grid-cols-[1fr_150px_150px] md:grid-cols-1 items-center w-full"
                >
                  <p class="text-headline-3 flex items-center w-full">
                    {{ item.fabricante.nome }}
                  </p>
                  <p class="w-full px-16 md:px-0 md:!text-14">
                    {{ getTotalQtd(item) }}
                  </p>
                  <p class="px-16 md:px-0 md:!text-14">
                    R$ {{ GLOBAL.currencyIntlNotPrefix(getTotalPrice(item)) }}
                  </p>
                </div>
              </template>

              <q-card class="flex justify-between">
                <o-table
                  class="table-inside-accordion w-full flex-nowrap"
                  table-class="bg-alert-10 !border-x-0"
                  :rows="
                    rows(
                      item.produtos.filter(
                        (prod) => prod.dados_vendas.valor_total > 0
                      )
                    )
                  "
                  :columns="columns"
                  row-key="name"
                  hide-header
                  secondary
                  separator="cell"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
                      </q-td>

                      <q-td key="qtd" :props="props">
                        {{ props.row.qtd }}
                      </q-td>

                      <q-td key="valor" :props="props" class="">
                        R$ {{ GLOBAL.currencyIntlNotPrefix(props.row.valor) }}
                      </q-td>
                    </q-tr>
                  </template>
                </o-table>
              </q-card>
            </o-accordion>

            <o-table
              class="w-full flex-nowrap mt-32"
              :rows="rowsTabelaProduto"
              :columns="columnsTabelaProduto"
              row-key="fabricante_nome"
              secondary
              v-model:pagination="initialPagination"
              :loading="loadingTable"
              separator="cell"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                    <OButton
                      v-if="col.name === 'porcentagem_vendas_30_dias'"
                      size="sm"
                      secondary
                      flat
                      icon="error"
                      class="flex-shrink-0 ml-4 !border-none"
                    >
                      <q-tooltip anchor="top middle">
                        Últimos 30 dias
                      </q-tooltip>
                    </OButton>
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  @click.prevent="handleClickEdit(props.row.id)"
                  class="cursor-pointer"
                >
                  <q-td key="fabricante_nome" :props="props">
                    {{ props.row.fabricante_nome }}
                  </q-td>
                  <q-td key="valor_custo" :props="props" auto-width>
                    R$ {{ GLOBAL.currencyIntlNotPrefix(props.row.valor_custo) }}
                  </q-td>
                  <q-td key="valor_vendido" :props="props" auto-width>
                    R$
                    {{ GLOBAL.currencyIntlNotPrefix(props.row.valor_vendido) }}
                  </q-td>
                  <q-td key="lucro" :props="props" auto-width>
                    R$ {{ GLOBAL.currencyIntlNotPrefix(props.row.lucro) }}
                  </q-td>

                  <q-td
                    key="porcentagem_vendas_30_dias"
                    :props="props"
                    auto-width
                  >
                    {{ props.row.porcentagem_vendas_30_dias }}%
                  </q-td>
                </q-tr>
              </template>
            </o-table>
          </div>
        </q-card>
      </main>
    </q-scroll-area>
  </q-layout>
  <ModalQuantidadeVendas ref="modalQtdVendasRef" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import { QPopupProxy } from 'quasar'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import OTable from 'src/components/Table/OTable.vue'
import OInput from 'src/components/Input/OInput.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { useContextStore } from 'src/stores/context/context.store'
import {
  columns as columnsExp,
  options as optionsExp,
  columnsTabelaProduto as columnsTabelaProdutoExp,
  rows,
  series as seriesExp,
} from './data'
import { api } from 'src/boot/axios'
import moment from 'moment'
import ModalQuantidadeVendas from 'src/components/Modal/ModalQuantidadeVendas.vue'

const { getFabricantes } = useContextStore()

const closeFilter = (e) => {
  document.querySelector('.porProduto .btnFilter').click()
}

const loading = ref(false)

const selectPeriodo = ref([
  { value: 'diario', label: 'Diário' },
  { value: 'mensal', label: 'Mensal' },
  { value: 'anual', label: 'Anual' },
])

const filterDate = ref({
  dataInicial: '',
  dataFinal: '',
  tipo_filtro: '',
})

const columns = ref(columnsExp)
const columnsTabelaProduto = ref(columnsTabelaProdutoExp)
const rowsTabelaProduto = ref([])
const options = ref([])
const series = ref([])
const chartPorProduto = ref(null)
const indicadores = ref({})
const responseFabricante = ref([])
const responseFiltered = ref([])
const search = ref('')
const produtosResponse = ref([])

const loadingTable = ref(false)

const initialPagination = ref({
  page: 1,
  rowsPerPage: null,
  sortBy: 'desc',
  descending: false,
})

const modalQtdVendasRef = ref(null)

const resetFilter = () => {
  filterDate.value = {
    dataInicial: '',
    dataFinal: '',
    tipo_filtro: '',
  }
  getDataWithFilters()
}

const openModalQtdVendas = (situation) => {
  console.log(situation)
  modalQtdVendasRef.value.setState({
    header: {
      hidden: false,
      title: situation === 'mais_vendidos' ? 'Mais vendidos' : 'Menos vendidos',
    },

    style: { width: '36.25rem', minHeight: '25rem' },

    data: {
      situation,
    },
  })
  modalQtdVendasRef.value.open()
}

const getTotalQtd = (item) => {
  const total = item.produtos.reduce((ac, val) => {
    ac += Number(val?.dados_vendas?.quantidade_unidades)
    return ac
  }, 0)

  return total
}

const getTotalPrice = (item) => {
  const total = item.produtos.reduce((ac, val) => {
    ac += Number(val?.dados_vendas?.valor_total)
    return ac
  }, 0)

  return total
}

const clearChart = () => {
  // const legends = document.querySelectorAll(
  //   '.apexcharts-legend .apexcharts-legend-series'
  // )
  const seriesNames = []
  document.querySelectorAll('.apexcharts-legend-series').forEach((el) => {
    seriesNames.push(el.getAttribute('seriesName'))
  })
  seriesNames.forEach((serie) => {
    document
      .querySelector(
        `.apexcharts-legend-series[seriesName='${serie}'] .apexcharts-legend-text`
      )
      .click()
  })
  // chartPorProduto.value.resetSeries()
}

const getDataWithFilters = async () => {
  loading.value = true
  try {
    await getDataGraficoVendedores({
      tipo_filtro: filterDate.value.tipo_filtro || 'mensal',
      data_inicial: filterDate.value.dataInicial
        ? moment(filterDate.value.dataInicial).format('DD-MM-YYYY')
        : '',
      data_final: filterDate.value.dataFinal
        ? moment(filterDate.value.dataFinal).format('DD-MM-YYYY')
        : '',
    })

    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

const getDataGraficoVendedores = async (params = {}) => {
  const { data } = await api.get(
    '/produto/relatorio_desempenho_por_fabricante/',
    {
      params: {
        ...params,
      },
    }
  )
  produtosResponse.value = data.listagem_fabricantes.filter((i) => {
    return i.fabricante.status === true
  })

  options.value = {
    ...optionsExp,
    xaxis: {
      categories: data.relatorio_por_fabricante.map(
        (relatorio) => relatorio.data
      ),
    },
  }

  console.log(data)
  indicadores.value = indicadores.value = data
  series.value = prepareGraphic(data)
}

const prepareGraphic = (series) => {
  const names = [
    ...new Set(
      series.relatorio_por_fabricante?.flatMap((row) => {
        return row.dados_fabricantes.map((i) => i.fabricante.nome)
      })
    ),
  ]

  const dataDosVendedores = names.map((name) => {
    const data = series.relatorio_por_fabricante?.flatMap((venda) => {
      return venda.dados_fabricantes
        ?.filter((relProduto) => relProduto?.fabricante.nome === name)
        ?.map((relProduto) => relProduto.dados_vendas.valor_total)
    })

    return { name, data }
  })

  return dataDosVendedores
}

const filterInternal = (search = '') => {
  responseFiltered.value = responseFabricante.value.filter((fabricante) => {
    if (
      fabricante.nome
        .toLowerCase()
        .includes(search.toLowerCase() || !search.length)
    ) {
      return fabricante
    }
    const result = fabricante.produto_set.filter((product) => {
      if (product.nome.toLowerCase().includes(search.toLowerCase())) {
        return true
      }

      return false
    })

    if (result.length > 0) return true

    return false
  })

  const accordions = document.querySelectorAll(
    '.porProduto .accordion .q-expansion-item__container .q-item'
  )
  for (const accordion of accordions) {
    const state = accordion.getAttribute('aria-expanded')
    if (state === 'false') accordion.click()
  }
}

const getDadosTabela = async () => {
  try {
    loadingTable.value = true
    const { data } = await api.get(
      `/produto/novo_relatorio_desempenho_fabricante/`,
      {}
    )
    rowsTabelaProduto.value = data.resultados || []
    // initialPagination.value = {
    //   ...initialPagination.value,
    //   rowsNumber: data.count,
    //   page,
    // }

    return data
  } catch (e) {
    console.log(e)
  } finally {
    loadingTable.value = false
  }
}

const handleSort = (col) => {
  initialPagination.value.descending = !initialPagination.value.descending
  initialPagination.value.sortBy = col
  console.log(initialPagination.value)
}

watch(
  () => search.value,
  () => {
    GLOBAL.debounce(1000, filterInternal, 'filterInternal')(search.value)
  }
)

onMounted(async () => {
  getDataGraficoVendedores()
  responseFabricante.value = await getFabricantes()
  responseFiltered.value = responseFabricante.value
  getDadosTabela()
})
</script>

<style lang="sass">
.porProduto
   .q-expansion-item.accordion
      .q-expansion-item__container
          width: 100%
          .q-item
            padding-right: 0px
   .q-expansion-item
      &:nth-child(1)
        border-radius: 6px 6px 0 0 !important
      &:nth-child(n+1):nth-child(-n+99)
        border-radius: 0px 0px 6px 6px

   .q-table__middle
      border-radius: 0px
</style>
