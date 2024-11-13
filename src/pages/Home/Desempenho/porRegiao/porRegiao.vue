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
              Desempenho por região
            </p>
          </div>

          <!-- Graphic -->
          <section
            class="flex items-start -mt-32 md2:mt-0 flex-nowrap md2:flex-col-reverse md2:gap-24"
          >
            <div class="flex-1 md2:w-full relative">
              <apexchart
                id="chartPorVendedor"
                ref="chartPorVendedor"
                type="bar"
                height="350"
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
                  <p class="mt-16 text-title-3">{{ indicadores.unidades }}</p>
                </div>
              </div>
              <!-- 2º card -->
              <div
                class="w-[246px] md2:w-full flex relative border border-neutral-10 rounded-md shadow-md py-20 px-16"
              >
                <div class="">
                  <h1 class="text-caps-2 text-neutral-70">Vendas</h1>
                  <p class="mt-16 text-title-3">
                    {{ indicadores.quantidade_vendas }}
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
                label="Pesquise por nome, tipo..."
                size="md"
                v-model="dateValue"
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
                    <o-button size="md" primary @click="getContasAReceber"
                      >Consultar</o-button
                    >
                  </div>
                </q-popup-proxy>
              </OButton>
            </div> -->
            <o-accordion
              v-for="vendedor in responseFiltered"
              :key="vendedor.id"
              switch-toggle-side
              class="accordion sm:!w-[67vw] !px-0 last:rounded-b-md bg-neutral-20 flex items-center w-full border border-neutral-100/10 dark:border-white/10"
            >
              <template v-slot:header>
                <div
                  class="titles-accordion grid grid-cols-[1fr_150px_150px] md:grid-cols-1 items-center w-full"
                >
                  <p class="text-headline-3 flex items-center w-full">
                    {{ vendedor.nome }}
                  </p>
                  <p class="w-full px-16 md:px-0 md:!text-14">Quantidade</p>
                  <p class="px-16 md:px-0 md:!text-14">Valor</p>
                </div>
              </template>

              <q-card class="flex justify-between">
                <o-table
                  :filter="filter"
                  class="table-inside-accordion w-full flex-nowrap"
                  table-class="bg-alert-10 !border-x-0"
                  :rows="
                    rows(
                      vendedor.fabricantes_set.filter(
                        (fabricante) =>
                          fabricante.dados_vendas.quantidade_vendas > 0
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

                      <q-td key="valor" :props="props" class="text-alert-error">
                        {{ GLOBAL.currencyBR(props.row.valor.toFixed(2)) }}
                      </q-td>
                    </q-tr>
                  </template>
                </o-table>
              </q-card>
            </o-accordion>
          </div>
        </q-card>
      </main>
    </q-scroll-area>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import OTable from 'src/components/Table/OTable.vue'
import OInput from 'src/components/Input/OInput.vue'
import GLOBAL from 'src/utils/GLOBAL'
import OSelect from 'src/components/Select/OSelect.vue'
import { useContextStore } from 'src/stores/context/context.store'
import { QPopupProxy } from 'quasar'
import {
  columns as columnsExp,
  options as optionsExp,
  rows,
  series as seriesExp,
} from './data'
import { api } from 'src/boot/axios'

const { getRegiao } = useContextStore()

const closeFilter = (e) => {
  document.querySelector('.homepage .btnFilter').click()
}

const columns = ref(columnsExp)
const options = ref([])
const series = ref([])
const chartPorVendedor = ref(null)
const indicadores = ref({})
const responseRegiao = ref([])
const responseFiltered = ref([])

const getDataGraficoVendedores = async () => {
  const { data } = await api.get('/macroregiao/relatorio_vendas/')
  options.value = {
    ...optionsExp,
    xaxis: {
      categories: data.relatorio_vendas.map((relatorio) => relatorio.data),
    },
  }
  indicadores.value = indicadores.value = data
  series.value = prepareGraphic(data)
}

const prepareGraphic = (series) => {
  const names = [
    ...new Set(
      series.relatorio_vendas?.flatMap((venda) => {
        return venda.relatorio_macro_regioes.map(
          (relRegiao) => relRegiao?.macro_regiao?.nome
        )
      })
    ),
  ]
  const dataDosVendedores = names.map((name) => {
    const data = series.relatorio_vendas.flatMap((venda) => {
      return venda.relatorio_macro_regioes
        .filter((relRegiao) => relRegiao?.macro_regiao?.nome === name)
        .map((relRegiao) => relRegiao.valor_vendido)
    })
    return { name, data }
  })

  return dataDosVendedores
}

onMounted(async () => {
  getDataGraficoVendedores()
  responseRegiao.value = await getRegiao()
  responseFiltered.value = responseRegiao.value
})
</script>

<style lang="sass">
.porVendedor
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
      tr td:nth-child(1)
        // padding: 0px 54px
</style>
