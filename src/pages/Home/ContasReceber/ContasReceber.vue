<template>
  <q-layout class="homepage" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main class="m-40">
        <q-card class="p-24 flex flex-col gap-32">
          <div class="flex items-center gap-8">
            <q-icon
              size="1.5rem"
              name="svguse:/icons.svg#icon_time_coins"
            ></q-icon>
            <p class="text-title-3">Contas a receber</p>
          </div>

          <div class="flex justify-between items-center md:gap-8">
            <o-input
              class="w-[22rem] md2:w-full"
              label="Pesquise por nome, tipo..."
              size="md"
              type="text"
              append-size="32px"
            >
              <!-- v-model="dateValue" -->
              <template v-slot:prepend>
                <OButton rounded class="-ml-8">
                  <q-icon
                    size="1.5rem"
                    name="svguse:/icons.svg#icon_search"
                  ></q-icon>
                </OButton>
              </template>
            </o-input>

            <div class="flex gap-8 md2:flex-1">
              <OButton
                class="btnFilter md2:w-full md2:mt-8"
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
                  class="popup-proxy w-[23.4375rem] flex flex-col gap-16"
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

                  <div class="flex gap-16">
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
              <OButton
                @click="resetFilter"
                class="md2:w-full md2:mb-16"
                size="md"
                secondary
              >
                Limpar filtro
              </OButton>
            </div>
          </div>

          <!-- Graphic -->
          <section
            class="flex items-start mt-32 md2:mt-0 flex-nowrap md2:flex-col-reverse md2:gap-24"
          >
            <div class="flex-1 md2:w-full relative">
              <p class="absolute -top-40 flex items-center gap-8">
                <span
                  class="block w-[8px] h-[8px] rounded-full bg-neutral-100"
                ></span
                >26 de Julho, 2022
              </p>
              <apexchart
                id="chartContas"
                ref="chartContasReceber"
                type="bar"
                height="350"
                :options="options"
                :series="series"
              ></apexchart>
            </div>
          </section>

          <!-- Accordion -->
          <section
            class="flex flex-col gap-8 -mt-32 w-full"
            v-if="accordions.length > 0"
          >
            <AccordionFooter
              v-for="accordion in accordions"
              :accordion="accordion"
              :lancamentos="accordion.lancamentos"
              :key="accordion?.vendedor?.id"
            />
          </section>
        </q-card>
      </main>
    </q-scroll-area>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

import AccordionFooter from './components/AccordionFooter.vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import moment from 'moment'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import { QPopupProxy } from 'quasar'

import {
  options as optionsExp,
  getUnidades,
  getBancos,
  getContasContabeis,
} from './data'
import { api } from 'src/boot/axios'

const { getVendedores } = useContextStore()
const { vendedores } = storeToRefs(useContextStore())

// Filter
const selectPeriodo = ref([
  { value: 'diario', label: 'Diário' },
  { value: 'mensal', label: 'Mensal' },
  { value: 'anual', label: 'Anual' },
])

const modelPeriodo = ref('')

const selectContabil = ref([])
const modelContabil = ref('')

const selectBanco = ref([])
const modelBanco = ref('')

const selectUnidade = ref([])
const modelUnidade = ref('')

// End Filter

const resetFilter = () => {
  modelContabil.value = ''
  modelPeriodo.value = ''
  modelBanco.value = ''
  modelUnidade.value = ''
  dataFinal.value = ''
  dataInicial.value = ''
  getContasAReceber()
}

const chartContasReceber = ref([])

const closeFilter = (e) => {
  document.querySelector('.homepage .btnFilter').click()
}

const options = ref(optionsExp)
const series = ref([])

const accordions = ref([])

const dataInicial = ref('')
const dataFinal = ref('')

const getContasAReceber = () => {
  console.log(modelPeriodo.value)
  api
    .get(
      `/lacamentofinanceiro/relatorio_constas_receberv2/?tipo_filtro=${
        modelPeriodo.value ? modelPeriodo.value.value : ''
      }&conta_contabil=${
        modelContabil.value?.value ? modelContabil.value?.value : ''
      }&banco=${
        modelBanco.value?.value ? modelBanco.value?.value : ''
      }&unidade=${
        modelUnidade.value?.value ? modelUnidade.value?.value : ''
      }&data_inicial=${
        dataInicial.value
          ? moment(dataInicial.value, 'YYYY-MM-DD').format('DD-MM-YYYY')
          : ''
      }&data_final=${
        dataFinal.value
          ? moment(dataFinal.value, 'YYYY-MM-DD').format('DD-MM-YYYY')
          : ''
      }`
    )
    .then(({ data }) => {
      series.value = data
      return data
    })
}

const getVendedor = async () => {
  api.get('/vendedor/lancamentos_por_vendedor/').then(({ data }) => {
    nextTick(() => {
      accordions.value = data.vendedores
    })
    return data
  })
}

watch(series, (newValue, oldValue) => {
  chartContasReceber.value.updateSeries(
    [
      {
        name: 'Contas a Receber',
        data: newValue.relatorio_contas_receber.map(
          (relatorio) => relatorio.valor
        ),
      },
    ],
    true,
    true
  )

  chartContasReceber.value.updateOptions(
    {
      xaxis: {
        categories: newValue.relatorio_contas_receber.map(
          (relatorio) => relatorio.data
        ),
      },
    },
    true,
    true
  )
})

onMounted(() => {
  getContasAReceber()
  getVendedor()
  getContasContabeis(selectContabil)
  getBancos(selectBanco)
  getUnidades(selectUnidade)
})
</script>

<style lang="sass">
.homepage
  .q-expansion-item__container .q-item__section--side
    display: none

  .accordion .q-focus-helper
    display: none

  .q-table__card .q-table__middle
    flex: initial

  .table-accordion th
    border-color: transparent
  .sticky-header-table
    height: auto
</style>
