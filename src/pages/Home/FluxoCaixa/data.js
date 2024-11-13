import GLOBAL from "src/utils/GLOBAL"
import { api } from 'src/boot/axios';

export const columns = [
  {
    name: 'unidade',
    required: true,
    label: 'Unidade',
    align: 'left',
    field: 'unidade',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'contaContabil',
    align: 'left',
    label: 'Conta contábil',
    field: 'contaContabil',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'dataVencimento',
    align: 'left',
    label: 'Data de vencimento',
    field: 'dataVencimento',
    sortable: true,
  },
  {
    style: 'width: auto',
    name: 'dataPagamento',
    align: 'left',
    label: 'Data de pagamento',
    field: 'dataPagamento',
  },
  {
    style: 'width: auto',
    name: 'tipo',
    align: 'left',
    label: 'Tipo',
    field: 'tipo',
  },
  {
    style: 'width: auto',
    name: 'descricao',
    align: 'left',
    label: 'Descrição',
    field: 'descricao',
  },
  {
    style: 'width: auto',
    name: 'origem',
    align: 'left',
    label: 'Origem',
    field: 'origem',
  },
  {
    style: 'width: auto',
    name: 'destino',
    align: 'left',
    label: 'Destino',
    field: 'destino',
  },
  {
    style: 'width: auto',
    name: 'valor',
    align: 'left',
    label: 'Valor',
    field: 'valor',
  },
]

export const rows = (rows) => {
  return rows.map(row => ({
    unidade: row.nome_unidade,
    contaContabil: row.conta_contabil,
    dataVencimento: row.data_vencimento,
    dataPagamento: row.data_pagamento,
    tipo: row.tipo,
    descricao: row.descricao,
    origem: row.origem,
    destino: row.destino,
    valor: row.valor_total
  }))
}


export const series = [{
  name: 'Receitas',
  data: [44, 55, 41, 67, 22, 43]
}, {
  name: 'Despesas',
  data: [30, 25, 36, 30, 45, 35]
}]


export const options = {
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    },
    grid: {
      show: true,
      borderColor: '#E9ECEF',
      strokeDashArray: 0,
      // position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
    },

    zoom: false,
    offsetY: 10
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val, opts) {
        return GLOBAL.currencyBR(Number(val).toFixed(2))
      },
    }
  },
  stroke: {
    width: [2, 2],
    curve: 'smooth'
  },
  colors: ['#008024', "#EC3539"],

  xaxis: {
    type: 'text'
  },
  markers: {
    size: 4,
    strokeWidth: 0,
    hover: {
      size: 4
    }
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'LEFT',
    formatter: function (seriesName, opts) {
      return `<p class="flex items-center gap-4"><span style="background: ${opts.w?.config?.colors[opts.seriesIndex]}" class="flex w-[24px] h-[2px] rounded-full relative  items-center justify-center">
          <span style="background: ${opts.w?.config?.colors[opts.seriesIndex]}" class="w-[6px] h-[6px] rounded-full absolute "></span>
        </span> ${seriesName}</p>`
    },
    markers: {
      width: 0,
      height: 0,
    }
  },

  responsive: [{
    breakpoint: 768,
    options: {
      chart: {
        width: '100%',
        offsetX: -15
      }
    },
  }]
}



