import moment from 'moment'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'
import { exportExcel } from 'src/utils/exportExcel'

export const columns = [
  // {
  //   name: 'nome_unidade',
  //   required: true,
  //   label: 'Unidade',
  //   align: 'left',
  //   field: 'nome_unidade',
  //   format: (val) => `${val}`,
  //   sortable: true,
  // },
  {
    style: 'width: auto',
    name: 'id',
    align: 'left',
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'descricao',
    align: 'left',
    label: 'Descrição',
    field: 'descricao',
    sortable: true,
  },
  {
    name: 'conta_contabil',
    align: 'left',
    label: 'Conta contábil',
    field: 'conta_contabil',
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
    name: 'tipo',
    align: 'left',
    label: 'Tipo',
    field: 'tipo',
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
    name: 'origem',
    align: 'left',
    label: 'Origem',
    field: 'origem',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'destino',
    align: 'left',
    label: 'Destino',
    field: 'destino',
    sortable: true,
  },
]

export const rows = (rows) => {

  return rows.map((row) => ({
    id: row.id,
    nome_unidade: row.nome_unidade,
    conta_contabil: row.nome_conta_contabil,
    data_vencimento: row.data_vencimento,
    data_pagamento: row.data_pagamento,
    tipo:
      row?.tipo === 'Venda'
        ? 'Receita'
        : row?.tipo === 'Compra'
          ? 'Despesa'
          : '',
    descricao: row.descricao,
    origem: row.nome_origem || 'Externo',
    destino: row.nome_destino || 'Externo',
    detalhes: row.detalhes || '',
    valor_total: row.valor_total,
  }))
}

export const series = [
  {
    name: 'Receita',
    data: [44, 55, 41, 67, 22, 43, 67, 22, 43, 67, 22, 43],
  },
  {
    name: 'Despesa',
    data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14],
  },
  {
    name: 'Receita Não Confirmada',
    data: [44, 55, 41, 67, 22, 43, 67, 22, 43, 67, 22, 43],
  },
  {
    name: 'Despesa Não Confirmada',
    data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14],
  },
]

export const options = {
  chart: {
    height: 430,
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: false,
    offsetY: 10,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val, opts) {
        return GLOBAL.currencyBR(Number(val).toFixed(2))
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '75%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
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
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  colors: ['#008024', '#00802480', '#EC3539', '#EC353980'],
  labels: [
    'Jan/2022',
    'Fev/2022',
    'Mar/2022',
    'Abr/2022',
    'Mai/2022',
    'Jun/2022',
    'Jul/2022',
    'Ago/2022',
    'Set/2022',
    'Out/2022',
    'Nov/2022',
    'Dez/2022',
  ],
  xaxis: {
    type: 'text',
    labels: {
      style: {
        colors: ['rgba(9, 18, 28, 1)'],
        fontSize: '11px',
      },
    },
    offsetY: -5,
  },
  markers: {
    size: 4,
    strokeWidth: 0,
    hover: {
      size: 4,
    },
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'LEFT',
    formatter: function (seriesName, opts) {
      console.log(
        'SERIES',
        seriesName,
        opts,
        opts.w?.config?.colors[opts.seriesIndex]
      )
      return `<p class="flex items-center gap-4"><span style="background: ${opts.w?.config?.colors[opts.seriesIndex]
        }" class="flex w-[24px] h-[2px] rounded-full relative  items-center justify-center">
          <span style="background: ${opts.w?.config?.colors[opts.seriesIndex]
        }" class="w-[6px] h-[6px] rounded-full absolute "></span>
        </span> ${seriesName}</p>`
    },
    markers: {
      width: 0,
      height: 0,
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
        xaxis: {
          labels: {
            show: false,
          },
        },
      },
    },
  ],
}

export const prepareRel = async (url, name) => {

  const {
    data: { results },
  } = await api.get(url)
  console.log('SALDO CAIXA', results)
  const objs = results.map((obj) => ({
    ID: obj?.id,
    Descrição: obj?.descricao,
    'Conta Contábil': obj?.nome_conta_contabil,
    'Data de Vencimento': obj?.data_vencimento
      ? moment(obj?.data_vencimento).format('DD/MM/YYYY')
      : '',
    'Data de Pagamento': obj?.data_pagamento
      ? moment(obj?.data_pagamento).format('DD/MM/YYYY')
      : '',
    Tipo:
      obj?.tipo === 'Venda'
        ? 'Receita'
        : obj?.tipo === 'Compra'
          ? 'Despesa'
          : '',
    Valor: Number(obj?.valor_total),
    Origem: obj?.nome_origem,
    Destino: obj?.nome_destino,
  }))
  await exportExcel(objs, name)
  return true
}
