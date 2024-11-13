<template>
  <div class="estudo relative">
    <div class="flex items-center justify-between flex-nowrap x">
      <div class="flex items-center gap-8">
        <q-icon size="1.5rem" name="svguse:/icons.svg#icon_vendas"></q-icon>
        <p class="text-title-3">Estudo de Tempo de Entrega</p>
      </div>
      <div class="flex justify-end gap-8 mt-16">
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
              <o-select
                v-model="filterDate.regiao"
                :options="optionsFilter.regioes"
                emit-value
                use-input
                map-options
                size="lg"
                behavior="menu"
                label="Região"
              ></o-select>
              <o-input
                label="Data Inicial"
                size="lg"
                v-model="filterDate.dataInicial"
                class="mt-16"
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
                label="Data Final"
                size="lg"
                v-model="filterDate.dataFinal"
                class="mt-16"
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
              <o-button size="md" primary @click="getDataGraficoEstudoEntrega"
                >Consultar</o-button
              >
            </div>
          </q-popup-proxy>
        </OButton>
        <OButton @click="resetFilter" class="md2:w-full" size="md" secondary>
          Limpar filtro
        </OButton>
      </div>
    </div>

    <div class="mt-24">
      <apexchart
        id="chartPorVendedor"
        ref="chartTempoEntregaRef"
        type="bar"
        :height="$q.screen.gt.sm ? '400px' : '300px'"
        :options="optionsChart"
        :series="series"
      ></apexchart>
    </div>
  </div>
  <div class="estudo-regiao">
    <div class="flex items-center justify-between flex-nowrap">
      <div class="flex items-center gap-8">
        <q-icon size="1.5rem" name="svguse:/icons.svg#icon_vendas"></q-icon>
        <p class="text-title-3">Estudo de Entrega por Região</p>
      </div>
      <div class="flex justify-end gap-8 mt-16">
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
              <o-input
                label="Data Inicial"
                size="lg"
                v-model="filterDateTempoMedio.dataInicial"
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
                          v-model="filterDateTempoMedio.dataInicial"
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
                label="Data Final"
                size="lg"
                v-model="filterDateTempoMedio.dataFinal"
                class="mt-16"
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
                          v-model="filterDateTempoMedio.dataFinal"
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
              <o-button
                size="md"
                primary
                @click="getDataGraficoEstudoEntregaPorRegiao"
                >Consultar</o-button
              >
            </div>
          </q-popup-proxy>
        </OButton>
        <OButton
          @click="resetFilterPorRegiao"
          class="md2:w-full"
          size="md"
          secondary
        >
          Limpar filtro
        </OButton>
      </div>
    </div>

    <div class="mt-24">
      <apexchart
        id="chartPorVendedor"
        ref="chartEntregaPorRegiaoRef"
        type="bar"
        :height="$q.screen.gt.sm ? '400px' : '300px'"
        :options="optionsChartRegiao"
        :series="seriesEstudoPorRegiao"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  options as optionsExp,
  optionsRegiao as optionsExpRegiao,
} from 'src/pages/Home/Vendas/data'
import GLOBAL from 'src/utils/GLOBAL'
import { api } from 'src/boot/axios'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'

const props = defineProps({
  optionsFilter: Object,
})
const series = ref([])
const seriesEstudoPorRegiao = ref([])
const chartTempoEntregaRef = ref(null)
const chartEntregaPorRegiaoRef = ref(null)
const route = useRoute()
const getDataGraficoEstudoEntrega = async () => {
  const paramsFilter = filterDate.value
  const { data: dados } = await api.get('/venda/porcentagem_tempo_entrega/', {
    params: {
      data_inicial: paramsFilter.dataInicial
        ? GLOBAL.dateToBrazil(paramsFilter.dataInicial)
        : GLOBAL.dateToBrazil(paramsFilter.dataInicial),
      data_final: paramsFilter.dataFinal
        ? GLOBAL.dateToBrazil(paramsFilter.dataFinal)
        : '',
      regiao: paramsFilter.regiao || null,
    },
  })

  console.log('DATA', dados)
  series.value = [
    {
      name: 'Porcentagem',
      data: dados.map((item) => item.porcentagem),
    },
  ]
  optionsChart.value = {
    ...optionsExp,
    xaxis: {
      categories: dados.map((item) => item.tempo),
    },
  }
}

const getDataGraficoEstudoEntregaPorRegiao = async () => {
  const paramsFilter = filterDateTempoMedio.value

  const { data: dados } = await api.get('/venda/grafico_vendas_regioes/', {
    params: {
      data_inicial: paramsFilter.dataInicial
        ? GLOBAL.dateToBrazil(paramsFilter.dataInicial)
        : GLOBAL.dateToBrazil(paramsFilter.dataInicial),
      data_final: paramsFilter.dataFinal
        ? GLOBAL.dateToBrazil(paramsFilter.dataFinal)
        : '',
    },
  })

  seriesEstudoPorRegiao.value = [
    {
      name: 'Porcentagem',
      data: dados.map((item) => item.porcentagem),
    },
  ]
  optionsChartRegiao.value = {
    ...optionsExpRegiao,
    xaxis: {
      categories: dados.map((item) => item.regiao),
    },
  }
}
const filterDate = ref({
  regiao: '',
  dataInicial: '',
  dataFinal: '',
  dataInicialPagamento: '',
  dataFinalPagamento: '',
})

const filterDateTempoMedio = ref({
  dataInicial: '',
  dataFinal: '',
  dataInicialPagamento: '',
  dataFinalPagamento: '',
})

const resetFilter = () => {
  filterDate.value = {
    dataInicial: '',
    dataFinal: '',
  }
  getDataGraficoEstudoEntrega()
}

const resetFilterPorRegiao = () => {
  filterDateTempoMedio.value = {
    dataInicial: '',
    dataFinal: '',
  }
  getDataGraficoEstudoEntregaPorRegiao()
}

const optionsChart = ref([])
const optionsChartRegiao = ref([])

onMounted(() => {
  getDataGraficoEstudoEntrega()
  getDataGraficoEstudoEntregaPorRegiao()
})
</script>
