import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'

export const useContextStore = defineStore('contextStore', () => {
  const vendedores = ref([])
  const compradores = ref([])
  const produtos = ref([])
  const origens = ref([])
  const fornecedores = ref([])
  const bancos = ref([])
  const contasContabeis = ref([])
  const unidades = ref([])
  const currentUser = ref({
    id: '',
  })
  const melhoresClientes = ref([])
  const produtosMelhoresClientes = ref([])
  const clientes = ref([])
  const fabricantes = ref([])
  const regiao = ref([])
  const bairros = ref([])
  const sabores = ref([])

  const produtosMargens = ref([])

  async function getVendedores(params = {}) {
    const { data } = await api.get(`/vendedor/`, {
      params: {
        ...params,
      },
    })
    const results = data.results.map((vendedor) => ({
      value: vendedor.id,
      label: vendedor.nome_completo,
      usuario_logado: vendedor.usuario,
    }))
    setVendedores(results)
    return data.results
  }

  function setVendedores(newList) {
    vendedores.value = newList
  }

  async function getFabricantes(params = {}) {
    const { data } = await api.get('/fabricante', {
      params: {
        ...params,
      },
    })
    console.log(data)
    const results = data.map((fabricante) => ({
      value: fabricante.id,
      label: fabricante.nome,
    }))
    setFabricantes(results)
    return data.results
  }

  function setFabricantes(newValue) {
    fabricantes.value = newValue
  }

  async function getCompradores(params = {}, id = '') {
    const { data } = await api.get(`/cliente/${id}?page_size=9999`, {
      params: {
        ...params,
      },
    })

    const results = data.results?.map((cliente) => ({
      value: cliente.id,
      label: cliente.nome,
    }))

    setCompradores(results)

    return data
  }

  function setCompradores(newList) {
    compradores.value = newList
  }

  async function getComprador(params = {}, id = '') {
    const { data } = await api.get(`/cliente/${id}`, {
      params: {
        ...params,
      },
    })
    return data
  }

  async function getProdutos(params = {}, id = '') {
    const { data } = await api.get(`/produto/${id}?page_size=9999`, {
      params: {
        ...params,
      },
    })
    const results = data.results.map((produto) => ({
      value: produto.id,
      label: produto.nome,
    }))
    setProdutos(results)
    return results
  }

  async function getProdutosCalculoMargens(params = {}, id = '') {

    const { data } = await api.get(`/produto/produtos_agrupados/${id}?page_size=9999`, {
      params: {
        ...params,
      },
    })



    const results = data.produtos_agrupados.map((produto) => {
      console.log(produto, 'produto margem')
      return {
        value: produto,
        label: produto.nome_produto,
      }
    });



    setProdutosMargens(results)

    return results
  }

  async function getProdutosFabricantes(params = {}, id = '') {
    const { data } = await api.get(`/produto/${id}?page_size=9999`, {
      params: {
        ...params,
      },
    })

    return data.results
  }

  function setProdutos(newList) {
    produtos.value = newList
  }

  function setProdutosMargens(newList) {
    produtosMargens.value = newList

    console.log(newList, 'produtos margens')

  }

  async function getOrigens() {
    const TOKEN = Cookies.get('NDT_TOKEN')
    const { data } = await api.get('/estoque/', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const results = data.results.map((origem) => ({
      value: origem.id,
      label: origem.nome,
      ...origem,
    }))
    setOrigens(results)
    return results
  }

  function setOrigens(newList) {
    origens.value = newList
  }

  async function getFornecedores(params = {}) {
    const { data } = await api.get('/fornecedor', {
      params: {
        ...params,
      },
    })
    const results = data.results.map((fornecedor) => ({
      value: fornecedor.id,
      label: fornecedor.nome,
    }))
    setFornecedores(results)
    return results
  }

  function setFornecedores(newList) {
    fornecedores.value = newList
  }

  async function getBancos() {
    const { data } = await api.get('/banco')
    const results = data.results.map((banco) => ({
      value: banco.id,
      label: banco.nome,
    }))
    setBancos(results)
    return results
  }

  function setBancos(newList) {
    bancos.value = newList
  }

  async function getContaContabil() {
    const { data } = await api.get('/contacontabil')
    const results = data.results.map((banco) => ({
      value: banco.id,
      label: banco.nome,
    }))
    setContaContabil(results)
    return results
  }

  function setContaContabil(newList) {
    contasContabeis.value = newList
  }

  async function getUnidades() {
    const { data } = await api.get('/unidade')
    const results = data.results.map((unit) => ({
      value: unit.id,
      label: unit.nome,
    }))
    setUnidades(results)
    return results
  }

  function setUnidades(newList) {
    unidades.value = newList
  }

  const sortOrdemAlfabetica = (a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  }

  async function getRegiao() {
    const { data } = await api.get('/regiao')
    const results = data.results.map((unit) => ({
      value: unit.id,
      label: unit.nome,
    }))
    setRegiao(results.sort(sortOrdemAlfabetica))
    return data.results
  }

  async function getBairros(filters) {
    const url = filters?.regiao ? `/bairro_no_paginated/?regiao__in=${filters.regiao}` : `/bairro_no_paginated/`;
    const { data } = await api.get(url)

    const _bairros = data
    const results = _bairros.map((unit) => ({
      value: unit.id,
      label: GLOBAL.capitalizarPrimeiraLetraCadaPalavra(unit.nome),
    }))



    setBairros(results.sort(sortOrdemAlfabetica))
    console.log(data, 'bairros')
    return data.bairros
  }

  function setRegiao(newList) {
    regiao.value = newList
  }

  function setBairros(newList) {
    bairros.value = newList
  }

  async function getSabores(params = {}) {
    const { data } = await api.get('/sabor', {
      params: {
        ...params,
      },
    })

    const results = data.results.map((sabor) => ({
      value: sabor.id,
      label: sabor.sabor_cigarro,
    }))
    setSabores(results)
    return results
  }

  function setSabores(newList) {
    sabores.value = newList
  }

  async function getDetailsCurrentUser() {
    const { data } = await api.get('/usuario/usuario_logado/')
    setCurrentUser(data)
    return data
  }

  function setCurrentUser(user) {
    currentUser.value.id = user.id
    currentUser.value.full = user
  }

  async function getMelhoresClientes() {
    const { data } = await api.get('/venda/top_clientes/')
    setMelhoresClientes(data)
    return data
  }

  function setMelhoresClientes(newList) {
    melhoresClientes.value = newList
  }

  async function getProdutosMelhoresClientes(idCliente, tipoClientes) {
    const isMensal = Boolean(tipoClientes === 'mensal')
    const { data } = await api.get(`/venda/produtos_comprados/?cliente_id=${idCliente}&mensal=${isMensal}`)
    setProdutosMelhoresClientes(data)
    return data
  }

  function setProdutosMelhoresClientes(newList) {
    produtosMelhoresClientes.value = newList
  }

  return {
    vendedores,
    getVendedores,
    compradores,
    getCompradores,
    getProdutos,
    produtos,
    getOrigens,
    origens,
    getFornecedores,
    fornecedores,
    bancos,
    getBancos,
    getContaContabil,
    contasContabeis,
    unidades,
    getUnidades,
    getDetailsCurrentUser,
    currentUser,
    getMelhoresClientes,
    melhoresClientes,
    getProdutosMelhoresClientes,
    produtosMelhoresClientes,
    getRegiao,
    regiao,
    getFabricantes,
    fabricantes,
    getSabores,
    sabores,
    setProdutos,
    setProdutosMargens,
    produtosMargens,
    getComprador,
    setCompradores,
    getProdutosFabricantes,
    getBairros,
    getProdutosCalculoMargens,
    bairros
  }
})
