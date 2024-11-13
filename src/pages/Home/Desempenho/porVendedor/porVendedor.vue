<template>
  <q-layout class="porVendedor" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main class="m-40">
        <q-card class="p-24 flex flex-col gap-32 overflow-hidden">
          <div class="flex items-center gap-8 md:-mb-32">
            <q-icon
              size="1.5rem"
              name="svguse:/icons.svg#icon_search_title"
            ></q-icon>
            <p class="text-title-3 !flex-nowrap md:!text-20">
              Desempenho por vendedor
            </p>
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
                <div class="flex flex-col gap-4">
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
                </div>
                <div class="flex flex-col gap-4">
                  <div class="flex gap-16">
                    <o-input
                      label="Data Pagamento Inicial"
                      size="lg"
                      v-model="filterDate.dataInicialPagamento"
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
                                v-model="filterDate.dataInicialPagamento"
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
                      label="Data Pagamento Final"
                      size="lg"
                      v-model="filterDate.dataFinalPagamento"
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
                                v-model="filterDate.dataFinalPagamento"
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
                </div>

                <div class="flex items-center justify-end gap-4 mt-8">
                  <o-button size="md" secondary @click="closeFilter"
                    >Cancelar</o-button
                  >
                  <o-button size="md" primary @click="getDataGraficoVendedores"
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
            class="grid grid-wrapper md2:flex w-full items-start -mt-32 md2:mt-0 flex-nowrap md2:flex-col-reverse md2:gap-24"
          >
            <div class="flex-1 h-full relative">
              <div
                @click="clearChart"
                class="flex justify-end items-center absolute top-8 right-24 cursor-pointer z-[99999999999999999]"
              >
                <p class="text-12">Resetar gráfico</p>
              </div>
              <apexchart
                id="chartPorVendedor"
                ref="chartPorVendedor"
                type="bar"
                :height="$q.screen.gt.sm ? '100%' : '300px'"
                :options="options"
                :series="series"
                v-if="series.length"
              ></apexchart>
              <!-- <div id="chartPorVendedor"></div> -->
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
                    {{ indicadores.unidades_total }}
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
                    {{ indicadores.quantidade_vendas_total }}
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
              <div
                class="w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="self-end">
                  <h1 class="text-caps-2 text-neutral-70">Ticket Médio</h1>
                  <div class="flex items-center gap-4">
                    <span class="text-headline-4 text-neutral-60">R$</span>
                    <p class="mt-16 text-title-3">
                      {{
                        GLOBAL.currencyNotPrefix(
                          indicadores.valor_total &&
                            indicadores.quantidade_vendas_total
                            ? Number(
                                indicadores.valor_total /
                                  indicadores.quantidade_vendas_total
                              ).toFixed(2)
                            : ''
                        )
                      }}
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
            <o-table
              :filter="filter"
              class="w-full flex-nowrap"
              :columns="columns"
              :rows="rows(responseVendedores)"
              row-key="name"
              secondary
              separator="cell"
            >
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
                </div>
              </template>
              <!-- v-if="vendedor.relatorio_cliente" -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>

                  <q-td key="vendas" :props="props">
                    {{ props.row.vendas }}
                  </q-td>

                  <q-td key="quantidade" :props="props">
                    {{ props.row.quantidade }}
                  </q-td>

                  <q-td key="valor" :props="props">
                    R$ {{ GLOBAL.currencyIntlNotPrefix(props.row.valor) }}
                  </q-td>

                  <q-td key="pa" :props="props">
                    {{ pa(props.row.quantidade, props.row.vendas) }}
                  </q-td>

                  <q-td key="ticketmedio" :props="props">
                    R$
                    {{ ticketMedio(props.row.valor, props.row.vendas) }}
                  </q-td>

                  <q-td key="dados_vendas_vendidov2">
                    <div class="flex items-center">
                      <p class="mr-16">{{ props.row.clientes_novos }}</p>

                      <OButton
                        v-if="props.row.clientes_novos"
                        secondary
                        dense
                        icon="svguse:/icons.svg#icon_search"
                        @click="
                          openModalClientesNovos(
                            props.row.id,
                            props.row.name,
                            props.row.clientes_novos_lista
                          )
                        "
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </o-table>
          </div>
        </q-card>
      </main>
    </q-scroll-area>
  </q-layout>
  <ModalClientesNovos ref="modalClientesNovosRef" />
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OTable from 'src/components/Table/OTable.vue'
import OInput from 'src/components/Input/OInput.vue'
import GLOBAL from 'src/utils/GLOBAL'
import ModalClientesNovos from 'src/components/Modal/ModalClientesNovos.vue'

import { useContextStore } from 'src/stores/context/context.store'
import { QPopupProxy } from 'quasar'
import {
  columns as columnsExp,
  options as optionsExp,
  prepareRel,
  rows,
  series as seriesExp,
} from './data'
import { api } from 'src/boot/axios'

const { getVendedores } = useContextStore()

const modalClientesNovosRef = ref(null)

const closeFilter = (e) => {
  document.querySelector('.porVendedor .btnFilter').click()
}

const filterDate = ref({
  dataInicial: '',
  dataFinal: '',
  dataInicialPagamento: '',
  dataFinalPagamento: '',
})

const filter = ref()
const columns = ref(columnsExp)
const options = ref([])
const loadingExcel = ref(false)
const series = ref([])
const chartPorVendedor = ref(null)
const indicadores = ref({})
const responseVendedores = ref([])

function ticketMedio(valor, valor2) {
  if (valor == null) {
    return 0
  } else if (valor2 == null) {
    return 0
  } else {
    return GLOBAL.currencyIntlNotPrefix(valor / valor2)
  }
}

function pa(valor, valor2) {
  if (valor == null) {
    return 0
  } else if (valor2 == null) {
    return 0
  } else {
    return Number(valor / valor2).toFixed(2)
  }
}

const resetFilter = () => {
  filterDate.value = {
    dataInicial: '',
    dataFinal: '',
    dataInicialPagamento: '',
    dataFinalPagamento: '',
  }
  getDataGraficoVendedores()
}

const clearChart = () => {
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
}

const getDataGraficoVendedores = async () => {
  const paramsFilter = filterDate.value
  const { data } = await api.get('/vendedor/relatorio_vendas/', {
    params: {
      data_inicial: paramsFilter.dataInicial
        ? GLOBAL.dateToBrazil(paramsFilter.dataInicial)
        : '',
      data_final: paramsFilter.dataFinal
        ? GLOBAL.dateToBrazil(paramsFilter.dataFinal)
        : '',
      data_pagamento_inicial: paramsFilter.dataInicialPagamento
        ? GLOBAL.dateToBrazil(paramsFilter.dataInicialPagamento)
        : '',
      data_pagamento_final: paramsFilter.dataFinalPagamento
        ? GLOBAL.dateToBrazil(paramsFilter.dataFinalPagamento)
        : '',
    },
  })
  options.value = {
    ...optionsExp,
    xaxis: {
      categories: data.relatorio_vendas.map((relatorio) => relatorio.data),
    },
  }
  indicadores.value = indicadores.value = data
  series.value = prepareGraphic(data)

  responseVendedores.value = await getVendedores({
    data_inicial: paramsFilter.dataInicial ? paramsFilter.dataInicial : '',
    data_final: paramsFilter.dataFinal ? paramsFilter.dataFinal : '',
    data_pagamento_inicial: paramsFilter.dataInicialPagamento
      ? paramsFilter.dataInicialPagamento
      : '',
    data_pagamento_final: paramsFilter.dataFinalPagamento
      ? paramsFilter.dataFinalPagamento
      : '',
  })
}

const initExportTable = async () => {
  const paramsFilter = filterDate.value
  loadingExcel.value = true
  await prepareRel(
    `/vendedor/?data_inicial=${
      paramsFilter.dataInicial ? paramsFilter.dataInicial : ''
    }&data_final=${
      paramsFilter.dataFinal ? paramsFilter.dataFinal : ''
    }&data_pagamento_inicial=${
      paramsFilter.dataInicialPagamento ? paramsFilter.dataInicialPagamento : ''
    }&data_pagamento_final=${
      paramsFilter.dataFinalPagamento ? paramsFilter.dataFinalPagamento : ''
    }`,
    'Desempenho_por_vendedor'
  )
  loadingExcel.value = false
}

const prepareGraphic = (series) => {
  const names = [
    ...new Set(
      series.relatorio_vendas?.flatMap((venda) => {
        return venda.relatorio_vendedor.map(
          (relVendedor) => relVendedor?.vendedor
        )
      })
    ),
  ]

  const dataDosVendedores = names.map((name) => {
    const data = series.relatorio_vendas.flatMap((venda) => {
      return venda.relatorio_vendedor
        .filter((relVendedor) => relVendedor?.vendedor === name)
        .map((relVendedor) => relVendedor.dados_vendas?.valor_total)
    })
    return { name, data }
  })

  return dataDosVendedores
}

const openModalClientesNovos = (idVendedor, nomeVendedor, clientesNovos) => {
  modalClientesNovosRef.value.setState({
    header: {
      hidden: false,
      title: 'Clientes Novos',
    },

    style: { width: '36.25rem', minHeight: '25rem' },

    data: {
      id_vendedor: idVendedor,
      nome_vendedor: nomeVendedor,
      clientes_novos: clientesNovos,
    },
  })
  modalClientesNovosRef.value.open()
}

onMounted(async () => {
  getDataGraficoVendedores()
  // responseVendedores.value = await getVendedores()
})
</script>

<style lang="sass">

.grid-wrapper
  grid-template-columns: 1fr 15rem
</style>
