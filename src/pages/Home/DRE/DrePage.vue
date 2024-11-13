<template>
  <q-layout class="DrePage" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <div class="h-full w-full absolute overflow-auto">
        <div class="h-[25rem] absolute w-full bg-d-neutral-40">
          <q-img class="w-full h-full object-cover z-0" :src="bgDre" />
        </div>
        <main class="m-40">
          <q-card class="p-24 flex flex-col gap-32 overflow-hidden">
            <div class="flex items-center gap-8">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_search_title"
              ></q-icon>
              <p class="text-title-3">Demostração Resultado do Exercício</p>
            </div>

            <div class="flex items-center justify-end">
              <DREFiltro
                :optionsFilterMargem="optionsFilterMargem"
                :selectedYear="selectedYear"
                @update:selectedYear="updateTable"
              />
            </div>

            <o-table
              class="my-sticky-last-column-table"
              :rows="rows"
              :columns="columns"
              row-key="name"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width />
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="!min-w-[100px] !text-center"
                    :class="
                      col.name === 'acumulado' ? '!min-w-[150px] relative' : ''
                    "
                  >
                    <span
                      :class="
                        col.name === 'acumulado'
                          ? 'absolute right-0 top-0 bottom-0 left-0 flex justify-center items-center'
                          : ''
                      "
                      >{{ col.label }}</span
                    >
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  class="cursor-pointer"
                  :class="props.row.id === 3 ? '!cursor-default' : ''"
                  @click="props.expand = !props.expand"
                >
                  <q-td auto-width>
                    <q-icon
                      size="0.8rem"
                      class="rotate-180 transition-all"
                      :class="[
                        props.expand ? 'arrow-default' : '',
                        ,
                        props.row.id === 3 || props.row.id === 4 || props.row.id === 5
                          ? 'opacity-0'
                          : '',
                      ]"
                      name="svguse:/icons.svg#arrow_bottom"
                    ></q-icon>
                  </q-td>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <p
                      class="pr-32"
                      :class="
                        col.name === 'acumulado'
                          ? 'absolute right-0 top-0 bottom-0 left-0 flex justify-center pr-0 items-center'
                          : ''
                      "
                    >
                      {{ col.value }}
                    </p>
                  </q-td>
                </q-tr>

                <template
                  v-for="item in resultado"
                  :key="item.nome_conta_contabil"
                >
                  <q-tr
                    v-show="props.expand && props.row.id !== 3"
                    :props="props"
                    v-if="
                      (props.row.id == 1 &&
                        item.meses.some((item) => item.total_receita > 0)) ||
                      (props.row.id == 2 &&
                        item.meses.some((item) => item.total_despesa > 0))
                    "
                  >
                    <q-td auto-width />
                    <q-td key="name" :props="props">
                      <p class="pr-32"> {{ item.nome_conta_contabil }} </p>
                    </q-td>
                    <q-td v-for="(mes, i) in meses" :key="mes" :props="props">
                      <p>
                        {{
                          props.row.id === 1
                            ? GLOBAL.currencyIntlNotPrefix(
                                item.meses[i]?.total_receita
                              )
                            : props.row.id === 2
                            ? GLOBAL.currencyIntlNotPrefix(
                                item.meses[i]?.total_despesa
                              )
                            : GLOBAL.currencyIntlNotPrefix(
                                item.meses[i]?.lucro_bruto
                              )
                        }}
                      </p>
                    </q-td>
                    <q-td key="acumulado" class="relative">
                      <p
                        class="absolute right-0 top-0 bottom-0 left-0 flex justify-center items-center"
                      >
                        {{
                          props.row.id === 1
                            ? GLOBAL.currencyIntlNotPrefix(item?.total_receita)
                            : props.row.id === 2
                            ? GLOBAL.currencyIntlNotPrefix(item?.total_despesa)
                            : GLOBAL.currencyIntlNotPrefix(item?.lucro_bruto)
                        }}
                      </p>
                    </q-td>
                  </q-tr>
                </template>
              </template>
            </o-table>
          </q-card>
        </main>
      </div>
    </q-scroll-area>
  </q-layout>
</template>

<script setup>
import bgDre from 'src/assets/image/bg-dre.png'
import { api } from 'src/boot/axios'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import DREFiltro from './components/DREFiltro.vue'
import GLOBAL from 'src/utils/GLOBAL'
import { ref, onMounted, Fragment } from 'vue'
import { QIcon } from 'quasar'
import OTable from 'src/components/Table/OTable.vue'

const dre = ref(null)
const rows = ref([])
const resultado = ref([])
const meses = ref([
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
])

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear - i
  return { label: year, value: year }
})

const selectedYear = ref(currentYear)

const optionsFilterMargem = ref({ years })

const loadRelatorio = () => {
  api
    .get('/lacamentofinanceiro/relatorio_dre_novo/', {
      params: {
        ano: selectedYear.value,
      },
    })
    .then(({ data }) => {
      const indices = ['receita', 'despesas', 'resultado', 'compras', 'dividendos']

      const totais = indices.map((indice, idxIndicador) => {
        const qtdMesDisponivel = data?.relatorio_dre[0]?.meses?.length - 1
        const meses = []
        for (let mesIndex = 0; mesIndex <= qtdMesDisponivel; mesIndex++) {
          const total = data?.relatorio_dre?.reduce((ac, val) => {
            if (idxIndicador === 0) {
              ac += parseFloat(val?.meses[mesIndex]?.total_receita)
            } else if (idxIndicador === 1) {
              ac += parseFloat(val?.meses[mesIndex]?.total_despesa)
            } else if (idxIndicador === 2) {
              ac += parseFloat(val?.meses[mesIndex]?.lucro_bruto)
            } else if (idxIndicador === 3) {
              ac += parseFloat(val?.meses[mesIndex]?.total_despesa_dividendo)
            } else if (idxIndicador === 4) {
              ac += parseFloat(val?.meses[mesIndex]?.total_despesa_compra)
            }
            return ac
          }, 0)
          meses.push(total)
        }
        return [
          ...meses,
          {
            total: meses.reduce((ac, val) => {
              ac += Number(val)
              return ac
            }, 0),
          },
        ]
      })
      dre.value = totais
      rows.value = [
        {
          id: 1,
          name: 'Receita Bruta de Serviços ou Vendas',
          jan: GLOBAL.currencyIntlNotPrefix(dre.value[0][0]),
          fev: GLOBAL.currencyIntlNotPrefix(dre.value[0][1]),
          mar: GLOBAL.currencyIntlNotPrefix(dre.value[0][2]),
          abr: GLOBAL.currencyIntlNotPrefix(dre.value[0][3]),
          mai: GLOBAL.currencyIntlNotPrefix(dre.value[0][4]),
          jun: GLOBAL.currencyIntlNotPrefix(dre.value[0][5]),
          jul: GLOBAL.currencyIntlNotPrefix(dre.value[0][6]),
          ago: GLOBAL.currencyIntlNotPrefix(dre.value[0][7]),
          set: GLOBAL.currencyIntlNotPrefix(dre.value[0][8]),
          out: GLOBAL.currencyIntlNotPrefix(dre.value[0][9]),
          nov: GLOBAL.currencyIntlNotPrefix(dre.value[0][10]),
          dez: GLOBAL.currencyIntlNotPrefix(dre.value[0][11]),
          acumulado: GLOBAL.currencyIntlNotPrefix(dre.value[0][12].total),
        },
        {
          id: 2,
          name: 'Despesas',
          jan: GLOBAL.currencyIntlNotPrefix(dre.value[1][0]),
          fev: GLOBAL.currencyIntlNotPrefix(dre.value[1][1]),
          mar: GLOBAL.currencyIntlNotPrefix(dre.value[1][2]),
          abr: GLOBAL.currencyIntlNotPrefix(dre.value[1][3]),
          mai: GLOBAL.currencyIntlNotPrefix(dre.value[1][4]),
          jun: GLOBAL.currencyIntlNotPrefix(dre.value[1][5]),
          jul: GLOBAL.currencyIntlNotPrefix(dre.value[1][6]),
          ago: GLOBAL.currencyIntlNotPrefix(dre.value[1][7]),
          set: GLOBAL.currencyIntlNotPrefix(dre.value[1][8]),
          out: GLOBAL.currencyIntlNotPrefix(dre.value[1][9]),
          nov: GLOBAL.currencyIntlNotPrefix(dre.value[1][10]),
          dez: GLOBAL.currencyIntlNotPrefix(dre.value[1][11]),
          acumulado: GLOBAL.currencyIntlNotPrefix(dre.value[1][12].total),
        },
        {
          id: 3,
          name: 'Dividendos',
          jan: GLOBAL.currencyIntlNotPrefix(dre.value[3][0]),
          fev: GLOBAL.currencyIntlNotPrefix(dre.value[3][1]),
          mar: GLOBAL.currencyIntlNotPrefix(dre.value[3][2]),
          abr: GLOBAL.currencyIntlNotPrefix(dre.value[3][3]),
          mai: GLOBAL.currencyIntlNotPrefix(dre.value[3][4]),
          jun: GLOBAL.currencyIntlNotPrefix(dre.value[3][5]),
          jul: GLOBAL.currencyIntlNotPrefix(dre.value[3][6]),
          ago: GLOBAL.currencyIntlNotPrefix(dre.value[3][7]),
          set: GLOBAL.currencyIntlNotPrefix(dre.value[3][8]),
          out: GLOBAL.currencyIntlNotPrefix(dre.value[3][9]),
          nov: GLOBAL.currencyIntlNotPrefix(dre.value[3][10]),
          dez: GLOBAL.currencyIntlNotPrefix(dre.value[3][11]),
          acumulado: GLOBAL.currencyIntlNotPrefix(dre.value[3][12].total),
        },
        {
          id: 4,
          name: 'Compras',
          jan: GLOBAL.currencyIntlNotPrefix(dre.value[4][0]),
          fev: GLOBAL.currencyIntlNotPrefix(dre.value[4][1]),
          mar: GLOBAL.currencyIntlNotPrefix(dre.value[4][2]),
          abr: GLOBAL.currencyIntlNotPrefix(dre.value[4][3]),
          mai: GLOBAL.currencyIntlNotPrefix(dre.value[4][4]),
          jun: GLOBAL.currencyIntlNotPrefix(dre.value[4][5]),
          jul: GLOBAL.currencyIntlNotPrefix(dre.value[4][6]),
          ago: GLOBAL.currencyIntlNotPrefix(dre.value[4][7]),
          set: GLOBAL.currencyIntlNotPrefix(dre.value[4][8]),
          out: GLOBAL.currencyIntlNotPrefix(dre.value[4][9]),
          nov: GLOBAL.currencyIntlNotPrefix(dre.value[4][10]),
          dez: GLOBAL.currencyIntlNotPrefix(dre.value[4][11]),
          acumulado: GLOBAL.currencyIntlNotPrefix(dre.value[4][12].total),
        },
        {
          id: 5,
          name: 'Resultado do Exercício',
          jan: GLOBAL.currencyIntlNotPrefix(dre.value[2][0]),
          fev: GLOBAL.currencyIntlNotPrefix(dre.value[2][1]),
          mar: GLOBAL.currencyIntlNotPrefix(dre.value[2][2]),
          abr: GLOBAL.currencyIntlNotPrefix(dre.value[2][3]),
          mai: GLOBAL.currencyIntlNotPrefix(dre.value[2][4]),
          jun: GLOBAL.currencyIntlNotPrefix(dre.value[2][5]),
          jul: GLOBAL.currencyIntlNotPrefix(dre.value[2][6]),
          ago: GLOBAL.currencyIntlNotPrefix(dre.value[2][7]),
          set: GLOBAL.currencyIntlNotPrefix(dre.value[2][8]),
          out: GLOBAL.currencyIntlNotPrefix(dre.value[2][9]),
          nov: GLOBAL.currencyIntlNotPrefix(dre.value[2][10]),
          dez: GLOBAL.currencyIntlNotPrefix(dre.value[2][11]),
          acumulado: GLOBAL.currencyIntlNotPrefix(dre.value[2][12].total),
        },
      ]
      resultado.value = data.relatorio_dre
    })
}

const updateTable = (value) => {
  selectedYear.value = value
  loadRelatorio()
}

onMounted(() => {
  loadRelatorio()
})

const columns = [
  {
    name: 'name',
    required: true,
    label: '',
    align: 'left',
    field: 'name',

    // field: (row) => row.name,
    // format: (val) => `${val}`,
    // sortable: true,
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'jan',
    label: 'Jan',
    field: 'jan',
    sortable: true,
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'fev',
    label: 'Fev',
    field: 'fev',
    sortable: true,
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'mar',
    label: 'Mar',
    field: 'mar',
    sortable: true,
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'abr',
    label: 'Abr',
    field: 'abr',
    sortable: true,
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'mai',
    label: 'Mai',
    field: 'mai',
    sortable: true,
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'jun',
    label: 'Jun',
    field: 'jun',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'jul',
    label: 'Jul',
    field: 'jul',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'ago',
    label: 'Ago',
    field: 'ago',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'set',
    label: 'Set',
    field: 'set',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'out',
    label: 'Out',
    field: 'out',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'nov',
    label: 'Nov',
    field: 'nov',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    align: 'left',
    style: 'width: auto',
    name: 'dez',
    label: 'Dez',
    field: 'dez',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    align: 'center',
    name: 'acumulado',
    label: 'Acumulado',
    field: 'acumulado',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
]
</script>

<style lang="sass">
.DrePage
  .arrow-default
      transform: rotate(0deg)
  .accordion-result .q-item__section--side
      display: none

  .q-expansion-item__container
        width: 100%
        .q-item
            background: rgba(var(--neutral-10),1)
            border-bottom: 1px solid rgba(var(--neutral-100),0.1)
  .my-sticky-last-column-table
    max-width: 100%



    thead tr:last-child th:last-child
      /* bg color is important for th; just specify one */
      background-color: #F5F5F5
      i
        position: absolute
        top: 0
        bottom: 0
        left: 8px
        margin: auto

    td:last-child
      background-color: #F5F5F5

    th:last-child,
    td:last-child
      position: sticky
      right: 0
      z-index: 1

    tbody tr:last-child
      cursor: default
      td:first-child
        span
          opacity: 0
</style>
