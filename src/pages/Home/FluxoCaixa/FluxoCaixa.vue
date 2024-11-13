<template>
  <q-layout class="fluxoCaixaPage" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main class="m-40">
        <q-card class="p-24 flex flex-col gap-32 overflow-hidden">
          <div class="flex items-center justify-between md:flex-col md:gap-16">
            <div class="flex items-center gap-8">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_search_title"
              ></q-icon>
              <p class="text-title-3">Fluxo de caixa</p>
            </div>

            <div class="flex gap-16 items-center md:flex-col md:w-full">
              <OButton class="btnFilter md:w-full" size="md" secondary>
                <q-icon
                  size="0.8rem"
                  name="svguse:/icons.svg#icon_filter_option"
                ></q-icon>
                Filtrar

                <q-popup-proxy
                  default
                  breakpoint="280"
                  class="popup-proxy w-[23.4375rem] md:w-full flex flex-col gap-16 flex-nowrap"
                >
                  <o-select
                    v-model="filterGraphic.modelPeriodo"
                    :options="optionsFilter.modelPeriodo"
                    size="md"
                    emit-value
                    map-options
                    behavior="menu"
                    label="Agrupar por período"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="filterGraphic.modelContabil"
                    :options="optionsFilter.modelContabil"
                    size="md"
                    emit-value
                    map-options
                    behavior="menu"
                    label="Conta Contábil"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="filterGraphic.modelBanco"
                    :options="optionsFilter.modelBanco"
                    size="md"
                    behavior="menu"
                    emit-value
                    map-options
                    label="Banco"
                    :clearable="true"
                  ></o-select>

                  <o-select
                    v-model="filterGraphic.modelUnidade"
                    :options="optionsFilter.modelUnidade"
                    size="md"
                    emit-value
                    map-options
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
                    <o-button size="md" primary @click="getFluxoCaixa"
                      >Consultar</o-button
                    >
                  </div>
                </q-popup-proxy>
              </OButton>
            </div>
          </div>

          <!-- Graphic -->
          <section
            class="flex items-start -mt-32 md2:mt-0 flex-nowrap md2:flex-col-reverse md2:gap-16"
          >
            <div class="flex-1 md2:w-full relative">
              <apexchart
                ref="chartFluxoCaixa"
                height="350"
                :options="options"
                :series="series"
              ></apexchart>
            </div>

            <div class="flex mt-32 md2:mt-0 flex-col gap-16 md2:w-full">
              <CardRightGraphic :cards="cards" />
            </div>
          </section>

          <!-- separator -->
          <div class="relative mt-32 -mb-16 md2:mt-0">
            <div class="absolute w-screen -left-64 h-1 bg-neutral-100/10"></div>
          </div>

          <o-table
            :filter="filter"
            class="sticky-header-table w-full flex-nowrap"
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

            <template v-slot:top-right>
              <div class="flex flex-1 justify-end gap-32 items-center">
                <div class="flex gap-8 items-center">
                  <p>Mostrar</p>
                  <o-select
                    class="min-w-[4.625rem]"
                    v-model="initialPagination.rowsPerPage"
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
                <q-td key="unidade" :props="props">
                  {{ props.row.unidade }}
                </q-td>
                <q-td key="contaContabil" :props="props">
                  {{ props.row.contaContabil }}
                </q-td>
                <q-td key="dataVencimento" :props="props">
                  {{ props.row.dataVencimento }}
                </q-td>
                <q-td key="dataPagamento" :props="props">
                  {{ props.row.dataPagamento }}
                </q-td>
                <q-td key="tipo" :props="props" :auto-width="true">
                  {{ props.row.tipo }}
                </q-td>
                <q-td key="descricao" :props="props">
                  {{ props.row.descricao }}
                </q-td>

                <q-td key="descricao" :props="props">
                  {{ props.row.origem }}
                </q-td>

                <q-td key="descricao" :props="props">
                  {{ props.row.destino }}
                </q-td>

                <q-td key="descricao" :props="props" class="text-alert-error">
                  {{ GLOBAL.currencyBR(props.row.valor) }}
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
import { ref, onMounted, watch, nextTick } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import OTable from 'src/components/Table/OTable.vue'
import GLOBAL from 'src/utils/GLOBAL'
import CardRightGraphic from './components/cardRightGraphic.vue'
import { QPopupProxy } from 'quasar'
import {
  columns as columnsExp,
  options as optionsExp,
  rows as rowsExp,
  series as seriesExp,
} from './data'
import { api } from 'src/boot/axios'
import moment from 'moment'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
const { getContaContabil, getBancos, getUnidades } = useContextStore()
const { contasContabeis, bancos, unidades } = storeToRefs(useContextStore())

const optionsSelect = ref(['5', '10', '15', '20', '25', '50'])
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

const model = ref('')
const series = ref([])
const chartFluxoCaixa = ref(null)

const columns = ref(columnsExp)
const options = ref(optionsExp)
const rows = ref([])
const filter = ref('')
const check = ref(false)

const initialPagination = ref({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
})

const cards = ref([
  {
    title: 'Receitas',
    valor: 0,
  },
  {
    title: 'Despesas',
    valor: 0,
  },
  {
    title: 'Saldo',
    valor: 0,
  },
])

const closeFilter = (e) => {
  document.querySelector('.fluxoCaixaPage .btnFilter').click()
}

const getFluxoCaixa = async () => {
  const filter = filterGraphic.value
  const { data } = await api.get(
    `/lacamentofinanceiro/relatorio_fluxo_caixa/?tipo_filtro=${
      filter.modelPeriodo || ''
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
  series.value = data
  return data
}

const dataTable = ref([])

watch(series, (newValue, oldValue) => {
  cards.value = [
    {
      title: 'Receitas',
      valor: GLOBAL.currencyBR(series.value?.valor_total_venda),
    },
    {
      title: 'Despesas',
      valor: GLOBAL.currencyBR(series.value.valor_total_compra),
    },
    {
      title: 'Saldo',
      valor: GLOBAL.currencyBR(series.value.saldo_total),
    },
  ]

  chartFluxoCaixa.value.updateSeries(
    [
      {
        name: 'Receita',
        data: newValue.relatorio_fluxo_caixa_compra.map(
          (relatorio) => relatorio.valor_venda
        ),
      },
      {
        name: 'Despesa',
        data: newValue.relatorio_fluxo_caixa_compra.map(
          (relatorio) => relatorio.valor_compra
        ),
      },
    ],
    true,
    true
  )

  chartFluxoCaixa.value.updateOptions(
    {
      xaxis: {
        categories: newValue.relatorio_fluxo_caixa_compra.map(
          (relatorio) => relatorio.data
        ),
      },
    },
    true,
    true
  )
})

watch(
  () => initialPagination.value.rowsPerPage,
  () => {
    onRequest({
      pagination: initialPagination.value,
    })
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

const onRequest = async (props) => {
  const { page, rowsPerPage, rowsNumber } = props.pagination
  const { data } = await api.get(
    `/lacamentofinanceiro/?search=${
      filter.value || ''
    }&page=${page}&page_size=${rowsPerPage}`
  )

  initialPagination.value = {
    ...initialPagination.value,
    rowsNumber: data.count,
    page,
  }
  rows.value = rowsExp(data.results)
}

onMounted(async () => {
  await getContaContabil()
  await getBancos()
  await getUnidades()
  getFluxoCaixa()
  onRequest({
    pagination: initialPagination.value,
  })
})
</script>

<style lang="sass">
.fluxoCaixaPage
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

  @media(max-width: 768px)
    .q-table__top
      gap: 16px
      width: 100%
      .q-table-control
        width: 100%

  .q-table__control:nth-child(2)
    display: none
</style>
