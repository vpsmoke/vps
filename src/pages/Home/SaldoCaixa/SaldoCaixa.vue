<template>
  <q-layout class="SaldoCaixaPage" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main
        class="m-40 md2:mx-0 flex md2:items-center md2:w-full flex-col gap-24"
      >
        <!-- Saldo em caixa -->
        <q-card
          class="p-24 w-full md2:max-w-[90vw] md2:w-full flex flex-col gap-24"
        >
          <div class="flex items-center justify-between md:flex-col md:gap-16">
            <div class="flex items-center gap-8">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_dollar"
              ></q-icon>
              <p class="text-title-3">Saldo caixa</p>
            </div>

            <div class="flex gap-16 items-center md:flex-col md:w-full">
              <OButton
                class="md:w-full"
                size="md"
                secondary
                @click="() => (hidden = !hidden)"
              >
                <q-icon
                  size="0.8rem"
                  name="svguse:/icons.svg#icon_hidden_info"
                ></q-icon>
                Ocultar valores
              </OButton>
            </div>
          </div>
          <!-- class="flex gap-16 items-start md2:flex-col flex-nowrap w-full overflow-auto" -->

          <IntroductoryCard
            :hidden="hidden"
            :cards="cards?.filter((card) => card.id != 6)"
            v-if="cards.length > 0"
          />
        </q-card>

        <!-- Receita x Despesas -->
        <q-card class="flex flex-col md2:max-w-[90vw] gap-24 overflow-hidden">
          <div
            class="flex p-24 md2:pb-0 items-center justify-between md:flex-col md:gap-16"
          >
            <div class="flex items-center gap-8">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_time_coins"
              ></q-icon>
              <p class="text-title-3">Receita x Despesas</p>
            </div>

            <div class="flex gap-8 items-center md:flex-col md:w-full">
              <OButton
                class="md2:w-full btnFilterGraphic md2:mt-8"
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
                  class="popup-proxy w-[23.4375rem] flex flex-col flex-nowrap gap-16"
                >
                  <o-select
                    v-model="filterGraphic.modelPeriodo"
                    :options="optionsFilter.modelPeriodo"
                    emit-value
                    map-options
                    size="md"
                    behavior="menu"
                    label="Agrupar por período"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="filterGraphic.modelContabil"
                    :options="optionsFilter.modelContabil"
                    emit-value
                    map-options
                    size="md"
                    behavior="menu"
                    label="Conta Contábil"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="filterGraphic.modelBanco"
                    :options="optionsFilter.modelBanco"
                    emit-value
                    map-options
                    size="md"
                    behavior="menu"
                    label="Banco"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="filterGraphic.modelUnidade"
                    :options="optionsFilter.modelUnidade"
                    emit-value
                    map-options
                    size="md"
                    behavior="menu"
                    label="Unidade"
                    :clearable="true"
                  ></o-select>

                  <div class="flex gap-16 flex-nowrap">
                    <o-input
                      label="De"
                      size="lg"
                      v-model="filterGraphic.dataInicial"
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
                                v-model="filterGraphic.dataInicial"
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
                      v-model="filterGraphic.dataFinal"
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
                                v-model="filterGraphic.dataFinal"
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
                    <o-button size="md" primary @click="getSaldoCaixa"
                      >Consultar</o-button
                    >
                  </div>
                </q-popup-proxy>
              </OButton>

              <OButton
                @click="clearFilter"
                class="md2:w-full"
                size="md"
                secondary
              >
                Limpar filtro
              </OButton>
            </div>
          </div>
          <!-- Graphic -->
          <section
            class="flex w-full p-24 items-start -mt-64 md2:mt-0 flex-nowrap md2:flex-col-reverse md2:gap-16"
          >
            <div class="flex-1 md2:w-full relative">
              <canvas id="myChart"></canvas>
              <!-- <apexchart
                ref="chartSaldoCaixa"
                height="430"
                :options="options"
                :series="series"
              ></apexchart> -->
            </div>

            <cardsRight :cards="cardsRightGraphic" />
          </section>

          <div class="w-full h-1 bg-neutral-30"></div>
          <o-table
            :filter="filter.search"
            class="w-full flex-nowrap px-24"
            :rows="rows"
            :columns="columns"
            v-model:pagination="initialPagination"
            row-key="name"
            secondary
            separator="cell"
            @request="onRequest"
          >
            <template v-slot:top-left>
              <o-input
                size="md"
                debounce="300"
                v-model="filter.search"
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
                <div class="flex items-center">
                  <OButton
                    class="sm:w-full w-max mr-8"
                    :class="[
                      loadingExcel ? 'opacity-70 pointer-events-none' : '',
                    ]"
                    size="md"
                    secondary
                    :loading="loadingExcel"
                    icon="svguse:/icons.svg#icon_document"
                    @click="(e) => initExportTable(e, 'Venda')"
                  >
                    Exportar receitas
                  </OButton>
                  <OButton
                    class="sm:w-full w-max mr-8"
                    :class="[
                      loadingExcel ? 'opacity-70 pointer-events-none' : '',
                    ]"
                    size="md"
                    secondary
                    :loading="loadingExcel"
                    icon="svguse:/icons.svg#icon_document"
                    @click="(e) => initExportTable(e, 'Compra')"
                  >
                    Exportar despesas
                  </OButton>
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
                </div>

                <OButton
                  class="md2:w-full btnFilterTable md2:mt-8"
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
                    class="popup-proxy w-[23.4375rem] flex flex-col flex-nowrap gap-16"
                  >
                    <o-select
                      v-model="filter.tipo"
                      :options="[
                        {
                          value: 'Compra',
                          label: 'Despesa',
                        },
                        {
                          value: 'Venda',
                          label: 'Venda',
                        },
                        {
                          value: 'Interna',
                          label: 'Interna',
                        },
                      ]"
                      emit-value
                      map-options
                      size="md"
                      behavior="menu"
                      label="Tipo"
                      :clearable="true"
                    ></o-select>
                    <div class="!flex gap-8 items-center md:flex-col">
                      <o-input
                        class="w-full"
                        label="Data realizada Inicial"
                        size="lg"
                        v-model="filter.dataRealizadaInicial"
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
                                  v-model="filter.dataRealizadaInicial"
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
                        class="w-full"
                        label="Data realizada Final"
                        size="lg"
                        v-model="filter.dataRealizadaFinal"
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
                                  v-model="filter.dataRealizadaFinal"
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
                      <o-button size="md" secondary @click="closeFilterTable"
                        >Limpar filtro</o-button
                      >
                      <o-button size="md" primary @click="getDataTable"
                        >Consultar</o-button
                      >
                    </div>
                  </q-popup-proxy>
                </OButton>
                <div class="flex gap-8 items-center">
                  <p>Mostrar</p>
                  <o-select
                    class="min-w-[4.625rem]"
                    v-model="modelViewPerPage"
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

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="descricao" :props="props" :auto-width="false">
                  <div class="flex items-center flex-nowrap">
                    <p>
                      {{ props.row.descricao }}
                    </p>
                    <OButton
                      v-if="props.row.detalhes"
                      size="sm"
                      secondary
                      icon="error"
                      class="ml-auto"
                      @click.stop="handleClickEdit(props.row.id)"
                    >
                      <q-tooltip
                        max-width="800px"
                        class="!p-0 rounded-md"
                        anchor="top middle"
                        self="top left"
                      >
                        <div class="bg-neutral-100 text-white p-6">
                          <h3 class="text-headline-3">Mais Detalhes</h3>
                        </div>
                        <div
                          class="py-10 px-6 text-xs"
                          v-html="
                            props.row.detalhes
                              .split('\n\n')[0]
                              .replaceAll('\n', '<br>')
                          "
                        ></div>

                        <div
                          class="p-6 border-t font-normal"
                          style="border-top-color: rgba(9, 18, 28, 0.05)"
                        >
                          <p>
                            {{ props.row.detalhes.split('\n\n')[1] }}
                          </p>
                        </div>
                      </q-tooltip>
                    </OButton>
                  </div>
                </q-td>

                <q-td key="conta_contabil" :props="props">
                  {{ props.row.conta_contabil }}
                </q-td>

                <q-td key="data_pagamento" :props="props">
                  {{ props.row.data_pagamento }}
                </q-td>
                <q-td key="tipo" :props="props" :auto-width="true">
                  {{ props.row.tipo }}
                </q-td>

                <q-td key="valor_total" class="text-gree" :props="props">
                  <span
                    v-if="props.row.tipo === 'Receita'"
                    class="text-alert-success"
                  >
                    {{
                      GLOBAL.currencyBR(
                        Number(props.row.valor_total).toFixed(2)
                      )
                    }}
                  </span>
                  <span
                    v-else-if="props.row.tipo === 'Despesa'"
                    class="text-alert-error"
                  >
                    {{
                      GLOBAL.currencyBR(
                        Number(props.row.valor_total).toFixed(2)
                      )
                    }}
                  </span>
                  <span v-else class="text-neutral-100">
                    {{
                      GLOBAL.currencyBR(
                        Number(props.row.valor_total).toFixed(2)
                      )
                    }}
                  </span>
                </q-td>

                <q-td key="origem" :props="props">
                  {{ props.row.origem }}
                </q-td>

                <q-td key="destino" :props="props">
                  {{ props.row.destino }}
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
import { options, columns, rows as rowsExp, prepareRel } from './data'
import { ref, watch, onMounted, shallowRef, computed } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import IntroductoryCard from './components/introductoryCard.vue'
import cardsRight from './components/cardsRight.vue'
import moment from 'moment'
import { api } from 'src/boot/axios'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import { QPopupProxy } from 'quasar'
import Chart from 'chart.js/auto'

const chart = ref('')
const filter = ref({
  search: '',
  tipo: '',
  dataRealizadaInicial: '',
  dataRealizadaFinal: '',
})
const loadingExcel = ref(false)
const cards = ref([])
const optionsSelect = ref(['10', '15', '20', '25', '50'])
const modelViewPerPage = ref('10')
const series = ref([])
const rows = ref([])
const hidden = ref(false)
const { getContaContabil, getBancos, getUnidades } = useContextStore()
const { contasContabeis, bancos, unidades } = storeToRefs(useContextStore())

const initialPagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 100,
  total: 0,
  // sortBy: '-id',
  descending: true,
})

const filterGraphic = ref({
  modelPeriodo: '',
  modelContabil: '',
  modelBanco: '',
  modelUnidade: '',
  dataFinal: '',
  dataInicial: '',
})

const optionsFilter = ref({
  modelPeriodo: [
    { value: 'diario', label: 'Diário' },
    { value: 'mensal', label: 'Mensal' },
    { value: 'anual', label: 'Anual' },
  ],
  modelContabil: contasContabeis.value,
  modelBanco: bancos.value,
  modelUnidade: unidades.value,
})

const vendasPor = computed(() => {
  return rows.value.map((row) => row.detalhes)
})

const cardsRightGraphic = ref([
  {
    title: 'Receitas Confirmadas',
    valor: 0,
    color: 'text-[#3871CF]',
  },
  {
    title: 'Receitas Não Confirmadas',
    valor: 0,
    color: 'text-[#1093EC80]',
  },
  {
    title: 'Despesas Confirmadas',
    valor: 0,
    color: 'text-[#E92C2C]',
  },
  {
    title: 'Despesas não Confirmadas',
    valor: 0,
    color: 'text-[#E7555580]',
  },
  {
    title: 'Dividendos',
    valor: 0,
    color: 'text-[#1093EC80]',
  },
])

watch(
  () => [modelViewPerPage.value],
  async () => {
    initialPagination.value.rowsPerPage = modelViewPerPage.value || 10
    onRequest({ pagination: initialPagination.value })
  }
)

watch(
  () => [contasContabeis, bancos, unidades],
  () => {
    optionsFilter.value = {
      ...optionsFilter.value,
      modelContabil: contasContabeis.value,
      modelBanco: bancos.value,
      modelUnidade: unidades.value,
    }
  },
  {
    deep: true,
  }
)

const handleSort = (col) => {
  initialPagination.value.descending = !initialPagination.value.descending
  initialPagination.value.sortBy = col
}

const clearFilter = () => {
  filterGraphic.value = {}
  getSaldoCaixa()
}

const closeFilter = (e) => {
  document.querySelector('.SaldoCaixaPage .btnFilterGraphic').click()
}

const closeFilterTable = () => {
  document.querySelector('.SaldoCaixaPage .btnFilterTable').click()
  filter.value = {}
  getSaldoCaixa()
}

const initExportTable = async (e, tipo) => {
  console.log({
    tipo,
    filter: filter.value,
  })
  loadingExcel.value = true
  let url
  if (tipo) {
    url = `/lacamentofinanceiro/?search=${filter.value.search}&tipo=${tipo}&data_pagamento__gte=${filter.value.dataRealizadaInicial}&data_pagamento__lte=${filter.value.dataRealizadaFinal}&page_size=99999`
  } else if (filter.value.tipo) {
    url = `/lacamentofinanceiro/?search=${filter.value.search}&tipo=${filter.value.tipo}&data_pagamento__gte=${filter.value.dataRealizadaInicial}&data_pagamento__lte=${filter.value.dataRealizadaFinal}&page_size=99999`
  } else {
    url = `/lacamentofinanceiro/?search=${filter.value.search}&data_pagamento__gte=${filter.value.dataRealizadaInicial}&data_pagamento__lte=${filter.value.dataRealizadaFinal}&page_size=99999`
  }
  await prepareRel(`${url}`, 'Saldo_caixa')
  loadingExcel.value = false
}

const getSaldoCaixa = () => {
  const filter = filterGraphic.value
  api
    .get(
      `/lacamentofinanceiro/relatorio_vendas_compras/?tipo_filtro=${
        filter.modelPeriodo || 'mensal'
      }&conta_contabil=${filter.modelContabil || ''}&banco=${
        filter.modelBanco || ''
      }&unidade=${filter.modelUnidade || ''}&data_inicial=${
        filter.dataInicial
          ? moment(filter.dataInicial, 'YYYY-MM-DD').format('DD-MM-YYYY')
          : ''
      }&data_final=${
        filter.dataFinal
          ? moment(filter.dataFinal, 'YYYY-MM-DD').format('DD-MM-YYYY')
          : ''
      }`
    )
    .then(({ data }) => {
      series.value = data
      return data
    })
}

watch(
  series,
  (newValue, oldValue) => {
    // chartSaldoCaixa.value.updateOptions(
    //   {
    //     xaxis: {
    //       categories: series.value.relatorio_vendas_compras.map(
    //         (relatorio) => relatorio.data
    //       ),
    //     },
    //   },
    //   true,
    //   true
    // )

    cardsRightGraphic.value = [
      {
        title: 'Receitas Confirmadas',
        valor: series.value.valor_total_venda,
        color: 'text-[#3871CF]',
      },
      {
        title: 'Receitas Não Confirmadas',
        valor: series.value.valor_total_venda_nao_confirmada,
        color: 'text-[#1093EC80]',
      },
      {
        title: 'Despesas Confirmadas',
        valor: series.value.valor_total_compra,
        color: 'text-[#E92C2C]',
      },
      {
        title: 'Despesas não Confirmadas',
        valor: series.value.valor_total_compra_nao_confirmada,
        color: 'text-[#E7555580]',
      },
      {
        title: 'Dividendos ',
        valor: series.value.valor_total_dividendo,
        color: 'text-[#1093EC80]',
      },
    ]

    chart.value.value.data.labels = series.value.relatorio_vendas_compras?.map(
      (rel) => rel.data
    )
    chart.value.value.data.datasets = [
      { title: 'Receita', propriedade: 'valor_venda' },
      {
        title: 'Receita Não Confirmada',
        propriedade: 'valor_venda_nao_confirmada',
      },
      { title: 'Despesa', propriedade: 'valor_compra' },
      {
        title: 'Despesa Não Confirmada',
        propriedade: 'valor_compra_nao_confirmada',
      },
      {
        title: 'Dividendos',
        propriedade: 'valor_dividendo',
      },
    ].map((idx, i) => {
      let obj = {
        ...chart.value.value.data.datasets[i],
        label: idx.title,
        data: [],
      }
      const results = series.value.relatorio_vendas_compras?.map(
        (rel) => rel[idx.propriedade]
      )
      obj = { ...obj, data: results }
      return obj
    })

    chart.value.value.update()
  },

  {
    deep: true,
    flush: 'post',
  }
)

const getDataTable = async () => {
  let url
  if (filter.value.tipo) {
    url = `/lacamentofinanceiro/?search=${filter.value.search}&page=${initialPagination.value.page}&page_size=${initialPagination.value.rowsPerPage}
    &tipo=${filter.value.tipo}&data_pagamento__gte=${filter.value.dataRealizadaInicial}&data_pagamento__lte=${filter.value.dataRealizadaFinal}`
  } else {
    url = `/lacamentofinanceiro/?search=${filter.value.search}&page=${initialPagination.value.page}&page_size=${initialPagination.value.rowsPerPage}
    &data_pagamento__gte=${filter.value.dataRealizadaInicial}&data_pagamento__lte=${filter.value.dataRealizadaFinal}`
  }
  const { data } = await api.get(url)

  rows.value = rowsExp(data.results)

  initialPagination.value.rowsNumber = data.count
}

const onRequest = async (props) => {
  const { page, rowsPerPage, rowsNumber } = props.pagination
  const { data } = await api.get(
    `/lacamentofinanceiro/?search=${filter.value.search}&page=${
      initialPagination.value.page
    }&page_size=${initialPagination.value.rowsPerPage}
      &tipo=${filter.value.tipo}&data_pagamento__gte=${
      filter.value.dataRealizadaInicial
        ? moment(filter.value.dataRealizadaInicial, 'YYYY-MM-DD').format(
            'YYYY-MM-DD'
          )
        : ''
    }&data_pagamento__lte=${
      filter.value.dataRealizadaFinal
        ? moment(filter.value.dataRealizadaFinal, 'YYYY-MM-DD').format(
            'YYYY-MM-DD'
          )
        : ''
    }`
  )

  initialPagination.value = {
    ...initialPagination.value,
    rowsNumber: data.count,
    total: data.count,
    page,
  }

  const col = initialPagination.value.sortBy
  const sortFn = initialPagination.value.descending
    ? (a, b) => (a[col] > b[col] ? -1 : a[col] < b[col] ? 1 : 0)
    : (a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0)
  rows.value = rowsExp(data.results.sort(sortFn))
}

const getDetailsBancos = async () => {
  const { data } = await api.get('/banco', {
    params: {
      ordering: 'ordem',
    },
  })
  cards.value = data.results
}

onMounted(() => {
  getSaldoCaixa()
  onRequest({
    pagination: initialPagination.value,
  })
  // SELECTS DO FILTRO DA TABELA
  getContaContabil()
  getBancos()
  getUnidades()
  getDetailsBancos()

  const ctx = document.getElementById('myChart')
  const data = {
    labels: [
      // 'Jan/2023',
      // 'Fev/2023',
      // 'Mar/2023',
      // 'Abr/2023',
      // 'Mai/2023',
      // 'Jun/2023',
      // 'Jul/2023',
      // 'Ago/2023',
      // 'Set/2023',
      // 'Out/2023',
      // 'Nov/2023',
      // 'Dez/2023',
    ],
    datasets: [
      {
        label: 'Receita Confirmada',
        data: [],
        backgroundColor: '#3871CF',
        stack: 'Stack 0',
        order: 2,
      },
      {
        label: 'Receita Não Confirmada',
        data: [],
        backgroundColor: '#1093EC80',
        stack: 'Stack 0',
        order: 2,
      },
      {
        label: 'Despesa Confirmada',
        data: [],
        backgroundColor: '#EC3539',
        stack: 'Stack 1',
        order: 2,
      },
      {
        label: 'Despesa Não Confirmada',
        data: [],
        backgroundColor: '#E7555580',
        stack: 'Stack 1',
        order: 2,
      },
      {
        label: 'Dividendos',
        data: [],
        backgroundColor: '#1093EC80',
        stack: 'Stack 2',
        type: 'line',
        order: 1,
      },
    ],
  }

  chart.value = shallowRef(
    new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        plugins: {
          title: {
            display: false,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        interaction: {
          intersect: true,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    })
  )
})
</script>

<style lang="sass">
@media(max-width: 768px)
  .SaldoCaixaPage
    @media(max-width: 768px)
    .q-table__top
      gap: 16px
      width: 100%
      .q-table-control
        width: 100%
</style>
