import moment from 'moment'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'
import { exportExcel } from 'src/utils/exportExcel'

export const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID da venda',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'nome_vendedor',
    required: true,
    label: 'Vendedor',
    align: 'left',
    field: 'vendedor',
    sortable: true,
  },
  {
    name: 'nome_cliente',
    required: true,
    label: 'Comprador',
    align: 'left',
    field: 'comprador',
    sortable: true,
  },
  {
    name: 'regiao',
    required: true,
    label: 'Região',
    align: 'left',
    field: 'regiao',
    sortable: true,
  },
  {
    name: 'bairro',
    required: true,
    label: 'Bairro',
    align: 'left',
    field: 'bairro',
    sortable: true,
  },
  {
    name: 'data_venda',
    align: 'left',
    label: 'Data realizada',
    field: 'data_venda',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'data_pagamento',
    align: 'left',
    label: 'Data de pagamento',
    field: 'data_pagamento',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'valor_total',
    align: 'left',
    label: 'Valor',
    field: 'valor_total',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'quantidade_unidades',
    align: 'left',
    label: 'Quantidade',
    field: 'quantidade_unidades',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'left',
    label: '',
    field: 'actions',
  },
]

export const columnsTempoEntrega = [
  {
    name: 'id',
    required: true,
    label: 'ID da venda',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'nome_vendedor',
    required: true,
    label: 'Vendedor',
    align: 'left',
    field: 'vendedor',
    sortable: true,
  },
  {
    name: 'nome_cliente',
    required: true,
    label: 'Comprador',
    align: 'left',
    field: 'comprador',
    sortable: true,
  },
  {
    name: 'regiao',
    required: true,
    label: 'Região',
    align: 'left',
    field: 'regiao',
    sortable: true,
  },
  {
    name: 'bairro',
    required: true,
    label: 'Bairro',
    align: 'left',
    field: 'bairro',
    sortable: true,
  },
  {
    name: 'dia_semana_venda',
    align: 'left',
    label: 'Dia Semana',
    field: 'dia_semana_venda',
    sortable: true,
  },
  {
    name: 'data_venda',
    align: 'left',
    label: 'Data realizada',
    field: 'data_venda',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'data_pagamento',
    align: 'left',
    label: 'Data de pagamento',
    field: 'data_pagamento',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'horario_saida',
    align: 'left',
    label: 'Horário de saída',
    field: 'horario_saida',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'horario_entrega',
    align: 'left',
    label: 'Horário de entrega',
    field: 'horario_entrega',
    sortable: true,

  },

  {
    style: 'width: auto',
    name: 'tempo_entrega',
    align: 'left',
    label: 'Tempo de entrega',
    field: 'tempo_entrega',
    sortable: true,
  }



]

/* export const rows = (rows) => {
  console.log('ROWS', rows)
  return rows.map(row => ({
    cliente: row.nome,
    vendas: row.relatorio_compras?.vendas,
    quantidade: row.relatorio_compras?.quantidade,
    pa: row.relatorio_compras?.pa,
    ticket_medio: row.relatorio_compras?.ticket_medio,
    valor: row.relatorio_compras?.valor
  }))
} */

export const rows = [
  {
    comprador: 'josy',
    data_realizada: '10/01/23',
    data_pagamento: '10/01/23',
    valor: '10.0',
    quantidade: '12',
  },
  {
    comprador: 'Bruno',
    data_realizada: '10/01/23',
    data_pagamento: '10/01/23',
    valor: '10.0',
    quantidade: '12',
  },
]

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
      borderRadius: 4,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return `${val.toFixed(2)} %`
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [


    ],

  },
  yaxis: {
    max: 100,
    labels: {
      formatter: function (val) {
        return `${val.toFixed(2)} %`
      }
    }
  },
  legend: {
    show: false,
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

  colors: ['#1093EC'],
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return `${val.toFixed(2)}%`
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
export const optionsRegiao = {
  series: [],


  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '90%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0
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
  xaxis: {
    labels: {
      rotate: -45
    },

    tickPlacement: 'on'
  },
  yaxis: {
    title: {
      text: 'Percentual de Vendas (%)',
    },
  },
  colors: ['#1093EC'],
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return `${val.toFixed(2)}%`
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
};

export const optionsChartFormaPagamento = {
  series: [44, 55, 13, 43, 22],
  chart: {
    width: 350,
    type: 'pie',
  },
  legend: {
    position: 'bottom'
  },

  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
};

export const prepareRel = async (url, name) => {
  const {
    data: { results },
  } = await api.get(url)
  console.log('VENDAS', results)
  const objs = results.map((obj) => ({
    'ID Venda': obj?.id,
    Vendedor: obj?.nome_vendedor,
    Comprador: obj?.nome_cliente,
    'Região': obj?.bairro_read?.regiao,
    'Bairro': obj?.bairro_read?.nome,
    'Data Realizada': obj?.data_venda
      ? moment(obj?.data_venda).format('DD/MM/YYYY')
      : '',
    'Data Pagamento': obj?.data_pagamento
      ? moment(obj?.data_pagamento).format('DD/MM/YYYY')
      : '',
    Valor: `${GLOBAL.currencyIntlNotPrefix(obj?.valor_total)}`.replaceAll('.', ''),
    Quantidade: obj?.quantidade_unidades,
  }))
  await exportExcel(objs, name)
  return true
}

export const prepareRelTempoEntrega = async (url, name) => {
  const {
    data: { results },
  } = await api.get(url)
  const objs = results.map((obj) => ({
    'ID Venda': obj?.id,
    Vendedor: obj?.nome_vendedor,
    Comprador: obj?.nome_cliente,
    'Região': obj?.bairro_read?.regiao,
    'Bairro': obj?.bairro_read?.nome,
    "Dia Semana": obj?.dia_semana_venda,
    'Data Realizada': obj?.data_venda
      ? moment(obj?.data_venda).format('DD/MM/YYYY')
      : '',
    'Data Pagamento': obj?.data_pagamento
      ? moment(obj?.data_pagamento).format('DD/MM/YYYY')
      : '',
    'Horário de Saída': obj?.horario_saida,
    'Horário de Entrega': obj?.horario_entrega,
    'Tempo de Entrega': obj?.tempo_entrega,
  }))
  await exportExcel(objs, name)
  return true
}
