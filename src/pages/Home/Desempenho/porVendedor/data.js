import moment from 'moment'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'
import { exportExcel } from 'src/utils/exportExcel'

export const columns = [
  {
    name: 'name',
    label: 'Nome',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    // style: 'width: 150px; min-width: 150px; max-width: 150px; padding-left: 16px',
    name: 'vendas',
    align: 'left',
    label: 'Vendas',
    field: 'vendas',
    sortable: true,
  },
  {
    // style: 'width: 150px; min-width: 150px; max-width: 150px; padding-left: 16px',
    name: 'quantidade',
    align: 'left',
    label: 'Quantidade',
    field: 'quantidade',
    format: (val) => {
      return val
    },
    sortable: true,
  },
  {
    // style: 'width: 150px; min-width: 150px; max-width: 150px; padding-left: 16px',
    name: 'valor',
    align: 'left',
    label: 'Valor',
    field: 'valor',
    format: (val) => {
      return val
    },
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'pa',
    align: 'left',
    label: 'P.A',
    field: 'pa',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'ticketmedio',
    align: 'left',
    label: 'Ticket Médio',
    field: 'ticketmedio',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'clientes_novos',
    align: 'left',
    label: 'Clientes Novos',
    field: 'clientes_novos',
    sortable: true,
  },
]

export const rows = (rows) => {
  if (!rows.length) return
  return rows.map((row) => ({
    id: row.id,
    name: row.nome_completo,
    vendas: row?.dados_vendas_vendidov2.quantidade_vendas,
    quantidade: row?.dados_vendas_vendidov2.quantidade,
    valor: row.dados_vendas_vendidov2.valor_total,
    clientes_novos: row.dados_vendas_vendidov2.quantidade_novos_clientes,
    clientes_novos_lista: row.dados_vendas_vendidov2.lista_clientes_novos,
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
      borderRadius: 4,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
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
  colors: ['#02131F', '#00416C', '#1093EC', '#007FD3'],
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

export const prepareRel = async (url, name) => {
  const {
    data: { results },
  } = await api.get(url)
  console.log('RESULTS', results)
  const objs = results.map((obj) => {
    return {
      Nome: obj?.nome_completo,
      Vendas: obj?.dados_vendas_vendidov2?.quantidade_vendas,
      Quantidade: obj?.dados_vendas_vendidov2?.quantidade,
      Valor: GLOBAL.currencyIntlNotPrefix(
        obj?.dados_vendas_vendidov2?.valor_total
      ),
      'P.A': Number(
        obj?.dados_vendas_vendidov2?.quantidade /
        obj?.dados_vendas_vendidov2?.quantidade_vendas
      ).toFixed(2).replace('.', ','),
      'Ticket Medio': GLOBAL.currencyIntlNotPrefix(
        obj?.dados_vendas_vendidov2?.valor_total /
        obj?.dados_vendas_vendidov2?.quantidade_vendas
      ),
      'Clientes Novos': 55
    }
  })
  await exportExcel(objs, name)
  return true
}
