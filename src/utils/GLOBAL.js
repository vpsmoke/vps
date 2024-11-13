import gsap from 'gsap/dist/gsap'
import { date, is, colors } from 'quasar'
import { unref } from 'vue'
import currency from 'currency.js'
import moment from 'moment'


export default {
  /** Search Query  */
  URLSearch: new URLSearchParams(window.location.search),
  debounce: (time, fn, name) => {
    return (...args) => {
      clearTimeout(window[name])
      window[name] = setTimeout(() => {
        fn(...args)
      }, time)
    }
  },

  removerTodosEspacosEmBranco: (str) => {
    return str.replace(/\s/g, '')
  },



  currencyIntlNotPrefix: (v) => {
    const value = v
    return new Intl.NumberFormat('pt', { style: 'currency', currency: 'BRL' }).format(v).replace('R$', '');
  },


  phoneMask: (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
  },

  maskNumberPhone: (numero) => {
    if (!numero) return null
    let numeroFormatado = null
    if (numero.includes('+')) {
      const regex = /^\+55\s*\(?(\d{2})\)?\s*(9?\d{4})[-.\s]*(\d{4})$/;

      // Tenta encontrar um match na string fornecida
      const match = numero.match(regex);

      if (match) {
        // Extrai os grupos capturados pela regex
        const codigoArea = match[1];
        const parte1 = match[2];
        const parte2 = match[3];

        // Formata o número de telefone conforme a máscara desejada
        numeroFormatado = `+55 (${codigoArea}) ${parte1}-${parte2}`;
      } else {
        numeroFormatado = null
      }
    } else {
      numeroFormatado = numero.replace(/\D/g, '')
      numeroFormatado = numeroFormatado.replace(/(\d{2})(\d)/, "($1) $2")
      numeroFormatado = numeroFormatado.replace(/(\d)(\d{4})$/, "$1-$2")
    }
    return numeroFormatado;
  },

  currencyBR: (v) => currency(v, {
    decimal: ',',
    fromCents: true,
    symbol: 'R$ ',
    separator: '.'
  }).format(),

  currencyNotPrefix: (v) => currency(v, {
    decimal: ',',
    fromCents: true,
    symbol: '',
    separator: '.'
  }).format(),

  senderValueBack: (v) => {
    return String(v).replace(/(\d+)(\d{2})/, '$1.$2')
  },

  enableDragScroll: (removeEvents) => (e, options) => {
    const domElement = e.currentTarget
    const target = e.target
    const offset = { x: 0, y: 0 }
    const startPos = { x: 0, y: 0 }

    const onMouseMove = (e) => {
      // console.log('onMouseMove')
      if (removeEvents.value) {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      domElement.scrollLeft = offset.x + startPos.x - e.clientX
      domElement.scrollTop = offset.y + startPos.y - e.clientY
      return false
    }

    const onMouseUp = (e) => {
      // console.log('onMouseUp')
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      return false
    }



    const onMouseDown = (e) => {
      // console.log('onMouseDown')
      removeEvents.value = false
      if (e.button !== 0 || options?.fxIgnore(e)) return

      startPos.x = e.clientX
      startPos.y = e.clientY
      offset.x = domElement.scrollLeft
      offset.y = domElement.scrollTop

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)

      return false
    }

    domElement.addEventListener('mousedown', onMouseDown)
  },

  // gera um rage de um array
  generateRange: (totalElementos, modelo /* cb  return obj template */) => {
    return Array.from({ length: totalElementos }, (_, i) =>
      modelo(i, totalElementos)
    )
  },


  // compara dois objetos e retorna a diferença
  compareAndReturnDiff: (valueA = {}, valueB = {}) => {
    const modificado = {}
    Object.entries(unref(valueB)).forEach(([key, v]) => {
      const a = valueA[key]
      const b = valueB[key]
      if (is.deepEqual(a, b)) return null
      else modificado[key] = v
    })
    return modificado
  },

  // Atualiza o height de acordo com a quantidade de filhos + gap
  setHeightInCol: (
    wrapper = '.cards-wrapper',
    item = '.kanban-card',
    space = 7
  ) => {
    document.querySelectorAll(wrapper).forEach((i) => {
      const filhos = [...i.querySelectorAll(item)]
      const gap = filhos.length * space

      const height = filhos.reduce((acc, children) => {
        acc += children.getBoundingClientRect().height
        return acc
      }, 0)

      const createCard = i
        .closest('.kanban-col')
        .querySelector('.kanban-new-card')

      const newCardSize = createCard
        ? createCard.getBoundingClientRect().height
        : 0

      const heightWithGap = (height + newCardSize + gap + 16).toFixed(0)
      gsap.to(i, {
        height: heightWithGap,
        duration: 0.5,
        ease: 'power1',
      })
    })
  },

  ordenateKey: (key) => (a, b /* sort cb */) => {
    if (a[key] > b[key]) return 1
    if (a[key] < b[key]) return -1
    return 0
  },

  getItemPerID: (id) => (acc, i /* reduce cb */) => {
    if (i.id === id) acc = i
    return acc
  },

  // return ex: '255, 255,255'
  returnRGB: (v) => (v ? `${Object.values(colors.hexToRgb(v))}` : ''),

  FData(value) {
    if (date.isValid(value)) {
      const dataFormatted = value.length > 10 ? value : value.replace('-', '/')
      const data = date.formatDate(dataFormatted, 'DD/MM/YYYY')
      return data
    } else {
      return '-'
    }
  },

  dateToBrazil(date) {
    console.log('DATA', date, moment(date).format('DDMM/YYYY'))
    return moment(date).format('DD-MM-YYYY');
  },

  FDateBRtoEU(value) {
    if (value) {
      const dia = value.slice(0, 2)
      const mes = value.slice(3, 5)
      const ano = value.slice(6, 10)
      return `${ano}-${mes}-${dia}`
    } else {
      return '-'
    }
  },

  FTime(value /* 00:00:00 */) {
    const hora = value?.slice(0, 2)
    const minutos = value?.slice(3, 5)
    const data = date.buildDate({ year: 2022, hours: hora, minutes: minutos })

    if (date.isValid(data)) {
      return date.formatDate(data, 'HH[h] mm[m]')
    } else {
      return '-'
    }
  },

  imgSrc(url) {
    if (!url) return ''
    const haveMedia = url.includes('/media')
    if (process.env.development && haveMedia) {
      return `${process.env.BACKEND_URL}${url.replace('/', '')}`
    } else {
      return url
    }
  },
  generateStringFilterFromObject(obj, x) {
    const filtros = Object.entries(obj) //
      .map(([key, value]) => {
        if (!value) return ''
        else {
          const isArray = Array.isArray(value)
          const v = isArray ? value.join(',') : value
          return `&${key?.trim()}=${v || ''}`
        }
      })
    return x ? filtros.join('') : `?q=${filtros.join('')}`
  },

  secondsToHours(seconds, mostrarSeconds = true) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    const seconds_ = seconds - hours * 3600 - minutes * 60
    return `${hours}h ${minutes}m ${mostrarSeconds ? `${Math.round(seconds_)}s` : ''
      }`
  },

  formatData(data) {
    const arr = data.split('-')
    arr.reverse()
    return arr.join('/')
  },
  capitalizarPrimeiraLetraCadaPalavra(frase) {
    const palavras = frase.split(' ');


    for (let i = 0; i < palavras.length; i++) {
      palavras[i] = palavras[i].charAt(0).toUpperCase() + palavras[i].slice(1);
    }

    const novaFrase = palavras.join(' ');

    return novaFrase;
  }
}
