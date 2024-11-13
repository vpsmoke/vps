import { api } from "src/boot/axios"
import GLOBAL from "src/utils/GLOBAL"

export const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id - Cliente',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'dataVencimento',
    align: 'left',
    label: 'Data de Compra',
    field: 'dataVencimento',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'cobrado',
    align: 'left',
    label: 'Cobrado em',
    field: 'cobrado',
  },
  {
    style: 'width: auto',
    name: 'valor',
    align: 'left',
    label: 'Valor',
    field: 'valor',
    format: (val) => {

      return val
    },
  },
  {
    style: 'width: 44px',
    name: 'edit',
    align: 'left',
    label: '',
    field: 'edit',
  },

]

export const rows = (rows) => {

  return rows.map(row => ({
    id: row.id,
    nome_cliente: row.nome_cliente,
    dataVencimento: row.data_vencimento,
    cobrado: row.cobrado_em,
    valor: row.valor_total,
    venda: row.venda
  }))
}
export const options = {
  chart: {
    type: 'bar',
    height: 350,
    offsetX: -20,
    offsetY: -28,
    toolbar: {
      show: false
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
      endingShape: 'rounded',
      borderRadius: 4,
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
      '01/06',
      '02/06',
      '03/06',
      '04/06',
      '05/06',
      '06/06',
      '07/06',
      '08/06',
      '09/06',
      '10/06',
      '11/06',
    ],
  },
  colors: ['#1093EC'],
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return GLOBAL.currencyBR(Number(val).toFixed(2));
      },
    },
  },
}

export const series = [
  {
    name: 'Net Profit',
    data: [44, 15, 20, 35, 5, 8, 30, 45, 10, 28, 38],
  },
]

export const getUnidades = (select) => {
  api.get('/unidade').then(({ data }) => {
    const result = data.results.map((result) => ({
      value: result.id,
      label: result.nome,
    }))
    select.value = result
    return data
  })
}

export const getContasContabeis = (select) => {
  api.get('/contacontabil').then(({ data }) => {

    const result = data.results.map((result) => ({
      value: result.id,
      label: result.nome,
    }))

    select.value = result
    return data
  })
}

export const getBancos = (select) => {
  api.get('/banco').then(({ data }) => {

    const result = data.results.map((result) => ({
      value: result.id,
      label: result.nome,
    }))

    select.value = result
    return data
  })
}
