import GLOBAL from 'src/utils/GLOBAL'
import { ref } from 'vue'

export const columns = [
  {
    name: 'name',
    required: true,
    label: '',
    align: 'left',
    fields: 'name',
    sortable: true,
  },
  {
    style:
      'width: 150px; min-width: 150px; max-width: 150px; padding-left: 16px',
    name: 'qtd',
    align: 'left',
    label: 'Unidade',
    field: 'qtd',
  },
  {
    style:
      'width: 150px; min-width: 150px; max-width: 150px; padding-left: 16px',
    name: 'valor',
    align: 'left',
    label: 'Valor',
    field: 'valor',
    format: (val) => {
      return val
    },
  },
]

export const columnsTabelaProduto = [
  {
    name: 'fabricante_nome',
    required: true,
    label: 'Fabricante',
    align: 'left',
    field: row => row.name,
    sortable: true,


  },
  {
    name: 'valor_custo',
    required: true,
    label: 'Preço de Custo',
    align: 'left',
    field: row => row.valor_custo,
    sortable: true,

  },
  {
    name: 'valor_vendido',
    required: true,
    label: 'Preço de Venda',
    align: 'left',
    field: row => row.valor_vendido,
    sortable: true,

  },
  {
    name: 'lucro',
    required: true,
    label: 'Lucro',
    align: 'left',
    field: row => row.lucro,
    sortable: true,

  },
  {
    name: 'porcentagem_vendas_30_dias',
    required: true,
    label: '% de Venda',
    align: 'left',
    field: row => row.porcentagem_vendas_30_dias,

    sortable: true,

  },



]

export const rows = (rows) => {
  return rows.map((row) => ({
    name: row.produto.nome,
    qtd: row.dados_vendas.quantidade_unidades,
    valor: row.dados_vendas.valor_total,
  }))
}



export const options = {
  chart: {
    type: 'bar',
    stacked: true,
    height: 350,
    offsetX: -10,
    offsetY: -28,
    toolbar: {
      show: false,
    },
  },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '90%',
      borderRadius: 0,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'all',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [
      'Maio de 2022',
      'Junho de 2022',
      'Julho de 2022',
      'Agosto de 2022',
      'Setembro de 2022',
      'Outubro de 2022',
    ],
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    position: 'top',
    horizontalAlign: 'right',
    formatter: function (seriesName, opts) {
      const bg = opts.w?.config?.colors[opts.seriesIndex]
      return `<p class="flex items-center gap-4"><span style="background: ${bg}" 
      class="block w-[16px] h-[6px] rounded-full"></span> ${seriesName}</p>`
    },
    markers: {
      width: 0,
      height: 0,
    },
  },
  title: {
    text: 'Receitas',
    offsetX: 7,
    offsetY: 50,
    style: {
      fontSize: '14px',
      color: '#4B5259',
      fontWeight: 400,
    },
  },
  colors: [
    '#050C19',
    '#081226',
    '#0A1833',
    '#0F244C',
    '#143066',
    '#1A3C80',
    '#1C428C',
    '#1F4799',
    '#2453B3',
    '#295FCC',
    '#2E6BE6',
    '#3377FF',
    '#4785FF',
    '#5C92FF',
    '#70A0FF',
    '#85ADFF',
    '#99BBFF',
    '#C2D6FF',
    '#D6E4FF',
    '#EBF1FF',
  ],
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return GLOBAL.currencyBR(Number(val).toFixed(2))
      },
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          width: '100%',
          offsetX: -15,
        },
        title: {
          text: 'Receitas',
          offsetX: 7,
          offsetY: 25,
          style: {
            fontSize: '14px',
            color: '#4B5259',
            fontWeight: 400,
          },
        },
      },
    },
  ],
}

export const series = [
  {
    name: 'Pedro',
    data: [44, 55, 41, 67, 22, 43],
  },
  {
    name: 'João',
    data: [13, 23, 20, 8, 13, 27],
  },
  {
    name: 'Felipe',
    data: [11, 17, 15, 15, 21, 14],
  },
  {
    name: 'Jonas',
    data: [21, 7, 25, 13, 22, 8],
  },
]
