<template>
  <div
    class="relative grid grid-cols-2 justify-center mx-auto overflow-hidden px-24 py-48"
  >
    <div class="chart-1">
      <h3 class="text-center text-title-4">Formas de Pagamento - Geral</h3>
      <apexchart
        class="mt-24"
        ref="chartFormaPagamentoRef"
        height="350px"
        :options="optionsChartFormaPagamento"
        :series="seriesGeral"
      ></apexchart>
    </div>
    <div class="chart-2">
      <h3 class="text-center text-title-4 font-medium">
        Formas de Pagamento - Últimos 30 dias
      </h3>
      <apexchart
        class="mt-24"
        ref="chartFormaPagamentoRef"
        height="350px"
        :options="optionsChartFormaPagamentoMensal"
        :series="seriesMensal"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { api } from 'src/boot/axios'
import { optionsChartFormaPagamento as optionsExpFormaPagamento } from 'src/pages/Home/Vendas/data'
const seriesGeral = ref([])
const seriesMensal = ref([])
const chartFormaPagamentoRef = ref(null)

const route = useRoute()
const optionsChartFormaPagamento = ref([])
const optionsChartFormaPagamentoMensal = ref([])
const getDataFormaPagamentoGeral = async () => {
  const { data: dados } = await api.get('/venda/grafico_forma_pagamento/')
  seriesGeral.value = dados.map((item) => item.porcentagem)
  optionsChartFormaPagamento.value = {
    ...optionsExpFormaPagamento,
    labels: dados.map((item) => item.forma_pagamento),
  }
}
const getDataFormaPagamentoMensal = async () => {
  const { data: dados } = await api.get(
    '/venda/grafico_forma_pagamento/?mensal=true'
  )
  console.log(dados.map((i) => i.porcentagem))

  seriesMensal.value = dados
    .map((item) => item.porcentagem)
    .sort((a, b) => b - a)

  optionsChartFormaPagamentoMensal.value = {
    ...optionsExpFormaPagamento,
    labels: dados.map((item) => item.forma_pagamento),
  }
}

onMounted(() => {
  getDataFormaPagamentoGeral()
  getDataFormaPagamentoMensal()
})
</script>

<style scoped></style>
