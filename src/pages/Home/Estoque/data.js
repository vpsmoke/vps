import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'
import { exportExcel } from 'src/utils/exportExcel'

export const prepareRel = async (url, name) => {
  const { data } = await api.get(url)
  console.log(data)
  const objs = data?.lista_estoque.map((obj) => ({
    Fabricante: obj.fabricante,
    Sabor: obj.sabor,
    Puff: obj.puff,
    'Valor compra': Number(obj?.valor_compra),
    'Valor venda': Number(obj?.valor_venda),
    Quantidade: obj.quantidade,
    Status: obj.status,
  }))
  console.log('EX', objs)
  await exportExcel(objs, name)
  return true
}

export const columns = [
  {
    name: 'fabricante',
    required: true,
    label: 'Fabricante',
    align: 'left',
    field: 'fabricante',
    sortable: true,
  },
  {
    name: 'sabor',
    align: 'left',
    label: 'Sabor',
    field: 'sabor',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'puff',
    align: 'left',
    label: 'Puffs',
    field: 'puff',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'status',
    align: 'left',
    label: 'Status',
    field: 'status',
    sortable: true,
  },

  {
    style: 'width: auto',
    name: 'valor_compra',
    align: 'left',
    label: 'Valor de compra',
    field: 'valor_compra',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'valor_venda',
    align: 'left',
    label: 'Valor de Venda',
    field: 'valor_venda',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'quantidade',
    align: 'left',
    label: 'Quantidade',
    field: 'quantidade',
    sortable: true,
  },
  // {
  //   style: 'width: auto',
  //   name: 'hidden_product',
  //   align: 'left',
  //   label: 'Ocultar produto',
  //   field: 'hidden_product',
  //   sortable: true,
  // },
]

// export const rows = [
//   {
//     fabricante: 'Bruno Siqueira',
//     sabor: '20',
//     status: '14/05/2022',
//     puffs: '16/05/2022',
//     tipo: 'Receita',
//     valorCompra: 'Parcela 01',
//     valorVenda: 'VPS Sistema',
//     quantidade: 'Itau',
//     valor: '1000'
//   },

// ]

export const rows = (rows) => {
  return rows?.map((stock) => ({
    fabricante: stock.fabricante,
    sabor: stock.sabor,
    status: stock.status,
    puffs: stock.puff,
    valor_compra: stock.valor_compra,
    valor_venda: stock.valor_venda,
    quantidade: stock.quantidade,
  }))
}

export const series = [
  {
    name: 'Receitas',
    data: [44, 55, 41, 67, 22, 43, 67, 22, 43, 67, 22, 43],
  },
  {
    name: 'Despesas',
    data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14],
  },
]

export const options = {
  chart: {
    height: 350,
    type: 'bar',
    toolbar: {
      show: false,
    },
    zoom: false,
    offsetY: 10,
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
  colors: ['#008024', '#EC3539'],
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
