import { colors } from 'quasar'
import { boot } from 'quasar/wrappers'
import VueApexCharts from 'vue3-apexcharts'

// "async" is optional;
export default boot(async ({ app }) => {
  app.use(VueApexCharts)
  // prettier-ignore
  // window.Apex.chart = { 
  //   FontFamily: 'Inter, sans-serif' ,
  // 	defaultLocale: 'pt-BR',
  //   toolbar: {
  //     show: false,
  //   },
	//   locales: [{
  //     name: 'pt-BR',
  //     options: {
  //       months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  //       shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  //       days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domindo'],
  //       shortDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  //       toolbar: {
  //         download: 'Download SVG',
  //         selection: 'Seleçao',
  //         selectionZoom: 'Seleçao Zoom',
  //         zoomIn: 'Zoom In',
  //         zoomOut: 'Zoom Out',
  //         pan: 'Panning',
  //         reset: 'Reset Zoom',
  //       }
  //     }
  //   }]
  // }

  // window.Apex.xaxis = {
  //   labels: {
  //     style: {
  //       fontFamily: 'Inter, sans-serif',
  //     },
  //   },
  // }
  // window.Apex.yaxis = {
  //   labels: {
  //     style: {
  //       fontFamily: 'Inter, sans-serif',
  //     },
  //   },
  // }

  // window.Apex.dataLabels = {
  //   style: {
  //     // fontSize: '14px',
  //     fontFamily: 'Inter, sans-serif',
  //   },
  // }
  // window.Apex.plotOptions = {
  //   bar: {
  //     borderRadius: 4,

  //     colors: {
  //       backgroundBarOpacity: 1,
  //     },
  //   },
  // }
  // window.Apex.fill = {
  //   opacity: 1,
  // }

  // window.Apex.colors = [
  //   '#11d276',
  //   '#cefcd4',
  //   '#0cb475',
  //   '#5a5568',
  //   '#febf44',
  //   '#6892ff',
  //   '#30e8aa',
  //   '#a82ac8',
  //   '#fff9c6',
  //   '#95ff8c',
  //   '#ffb388',
  //   '#99c5dd',
  //   '#ff6565',
  //   '#917bd9',
  //   '#d91540',
  //   '#800080',
  //   '#FF871E',
  //   '#77001A',
  //   '#18B25D',
  // ]
})
