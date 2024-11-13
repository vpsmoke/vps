import GLOBAL from "src/utils/GLOBAL"

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
    style: 'width: 150px; min-width: 150px; max-width: 150px; padding-left: 16px',
    name: 'qtd',
    align: 'left',
    label: 'Unidade',
    field: 'qtd',
  },
  {
    style: 'width: 150px; min-width: 150px; max-width: 150px; padding-left: 16px',
    name: 'valor',
    align: 'left',
    label: 'Valor',
    field: 'valor',
    format: (val) => {
      return val
    },
  },
]

export const rows = (rows) => {
  return rows.map(row => ({
    name: row.nome_fabricante,
    qtd: row.dados_vendas.quantidade_vendas,
    valor: row.dados_vendas.valor_total
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
      show: false
    }
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
      const bg = opts.w?.config?.colors[opts.seriesIndex];
      return `<p class="flex items-center gap-4"><span style="background: ${bg}" 
      class="block w-[16px] h-[6px] rounded-full"></span> ${seriesName}</p>`
    },
    markers: {
      width: 0,
      height: 0,
    }
  },
  title: {
    text: 'Receitas',
    offsetX: 7,
    offsetY: 50,
    style: {
      fontSize: '14px',
      color: '#4B5259',
      fontWeight: 400
    }
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
  responsive: [{
    breakpoint: 768,
    options: {
      chart: {
        width: '100%',
        offsetX: -15
      },
      title: {
        text: 'Receitas',
        offsetX: 7,
        offsetY: 25,
        style: {
          fontSize: '14px',
          color: '#4B5259',
          fontWeight: 400
        }
      },
    },
  }]
}

export const series =
  [{
    name: 'Pedro',
    data: [44, 55, 41, 67, 22, 43]
  }, {
    name: 'João',
    data: [13, 23, 20, 8, 13, 27]
  }, {
    name: 'Felipe',
    data: [11, 17, 15, 15, 21, 14]
  }, {
    name: 'Jonas',
    data: [21, 7, 25, 13, 22, 8]
  }]
