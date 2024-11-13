import moment from 'moment'
import { api } from 'src/boot/axios'
import GLOBAL from 'src/utils/GLOBAL'
import { exportExcel } from 'src/utils/exportExcel'

export const columns = [
  {
    name: 'cliente',
    required: true,
    label: 'Cliente',
    align: 'left',
    field: 'cliente',
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    style: 'width: auto',
    name: 'bairro',
    align: 'left',
    label: 'Bairro',
    field: 'bairro',
  },
  {
    style: 'width: auto',
    name: 'regiao',
    align: 'left',
    label: 'Região',
    field: 'regiao',
  },
  {
    style: 'width: auto',
    name: 'whatsapp',
    align: 'left',
    label: 'Whatsapp',
    field: 'whatsapp',
  },
  {
    style: 'width: auto',
    name: 'genero',
    align: 'left',
    label: 'Gênero',
    field: 'genero',
  },
  {
    style: 'width: auto',
    name: 'vendas',
    align: 'left',
    label: 'Vendas',
    field: 'vendas',
    sortable: true,
  },
  {
    name: 'quantidade',
    align: 'left',
    label: 'Quantidade',
    field: 'quantidade',
    sortable: true,
  },
  {
    name: 'data_criacao',
    align: 'left',
    label: 'Data criação',
    field: 'data_criacao',
  },
  {
    style: 'width: auto',
    name: 'ultima_venda',
    align: 'left',
    label: 'Última Venda',
    field: 'ultima_venda',

  },
  {
    style: 'width: auto',
    name: 'ultimo_vendedor',
    align: 'left',
    label: 'Último Vendedor',
    field: 'ultimo_vendedor',

  },
  {
    style: 'width: auto',
    name: 'pa',
    align: 'left',
    label: 'PA',
    field: 'pa',
  },
  {
    style: 'width: auto',
    name: 'ticket_medio',
    align: 'left',
    label: 'Ticket médio',
    field: 'ticket_medio',
    format: (val) => {
      console.log(GLOBAL.currencyBR(val))
      return val
    },
  },
  // {
  //   style: 'width: auto',
  //   name: 'ultimo_vendedor',
  //   align: 'left',
  //   label: 'Último Vendedor',
  //   field: 'ultimo_vendedor',
  // },
  // {
  //   style: 'width: auto',
  //   name: 'ultima_venda',
  //   align: 'left',
  //   label: 'Última Venda',
  //   field: 'ultima_venda',
  // },

  {
    style: 'width: 44px',
    name: 'valor',
    align: 'left',
    label: 'Total',
    field: 'valor',
  },
]

export const rows = (rows) => {
  console.log('ROWS', rows)
  return rows.map((row) => ({
    cliente: row.nome,
    vendas: row.relatorio_compras?.vendas,
    quantidade: row.relatorio_compras?.quantidade,
    data_criacao: moment(row.data_criacao).format('DD/MM/YYYY'),
    pa: row.relatorio_compras?.pa,
    ticket_medio: row.relatorio_compras?.ticket_medio,
    valor: row.relatorio_compras?.valor,
    bairro: row.bairro,
    whatsapp: row.whatsapp,
    genero: row.genero,
    ultima_venda: moment(row.ultima_venda).format('DD/MM/YYYY'),
    id_ultima_venda: row.id_ultima_venda,
    ultimo_vendedor: row.ultimo_vendedor,
    nome_bairro: row.nome_bairro,
    nome_regiao: row.nome_regiao,
  }))
}

export const options = {
  chart: {
    height: 350,
    type: 'bar',
    stacked: true,
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
    grid: {
      show: true,
      borderColor: '#E9ECEF',
      strokeDashArray: 0,
      // position: 'back',
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

    zoom: false,
    offsetY: 10,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val, opts) {
        return GLOBAL.currencyBR(Number(val).toFixed(2))
      },
    },
  },
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  colors: ['#008024', '#EC3539'],
  // labels: ['Maio de 2022', 'Junho de 2022', 'Julho de 2022', 'Agosto de 2022', 'Setembro de 2022', 'Outubro de 2022'],
  xaxis: {
    type: 'text',
    // categories: ['Maio de 2022', 'Junho de 2022', 'Julho de 2022', 'Agosto de 2022', 'Setembro de 2022', 'Outubro de 2022']
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
        dataLabels: {
          enabled: false,
        },
      },
    },
  ],
}

export const prepareRel = async (url, name) => {
  const { data } = await api.get(url)
  if (!data) return true
  const arrFormated = data?.relatorio_tabela[0]?.map((arr) => ({
    id: arr[0],
    cliente: arr[1],
    vendas: arr[2],
    quantidade: arr[3],
    data_criacao: arr[17],
    valor: arr[4],
    ticket_medio: arr[5],
    pa: arr[6],
    bairro: arr[7],
    whatsapp: arr[9],
    genero: arr[8],
    ultima_venda: arr[10],
    id_ultima_venda: arr[11],
    nome_vendedor: arr[14],
    apelido_vendedor: arr[13],
    nome_bairro: arr[15],
    nome_regiao: arr[16],


  }))


  const objs = arrFormated.map((obj) => ({
    Cliente: obj?.cliente,
    Bairro: obj?.nome_bairro,
    'Região': obj?.nome_regiao,
    Whatsapp: obj?.whatsapp,
    'Gênero': obj?.genero,
    'Última Venda': obj?.ultima_venda,
    'Último Vendedor': obj?.nome_vendedor,
    Vendas: obj?.vendas,
    Quantidade: obj?.quantidade,
    'Data Criação': obj?.data_criacao,
    'P.A': Number(Number(obj?.pa).toFixed(2).replace("'", '')),
    'Ticket Médio': GLOBAL.currencyBR(Number(obj?.ticket_medio)?.toFixed(2)),
    Total: GLOBAL.currencyBR(Number(obj?.valor)?.toFixed(2)),
  }))
  await exportExcel(objs, name)

  return true
}
