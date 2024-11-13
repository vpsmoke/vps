<template>
  <q-layout class="CadastrarCompra" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <div class="h-full w-full absolute overflow-auto">
        <div class="h-[25rem] absolute w-full bg-d-neutral-40">
          <q-img class="w-full h-full object-cover z-0" :src="bgDre" />
        </div>
        <main
          class="m-40 flex justify-center flex-col md2:w-full w-[53.5rem] max-w-[53.5rem] mx-auto"
        >
          <q-card
            class="flex flex-col gap-24 md2:w-[90vw] md2:mx-auto overflow-hidden p-24 rounded-b-none"
          >
            <div class="flex items-center gap-6">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_file_edit"
              ></q-icon>
              <p class="text-title-3">Cadastrar compra</p>
            </div>

            <div class="flex flex-col gap-16">
              <div class="flex items-center gap-16 flex-nowrap md2:flex-col">
                <o-select
                  v-model="informationVenda.fornecedor"
                  :options="fornecedores"
                  size="lg"
                  emit-value
                  map-options
                  use-input
                  behavior="menu"
                  label="Fornecedor"
                  :clearable="true"
                  class="w-full"
                ></o-select>
                <o-select
                  v-model="informationVenda.destino"
                  :options="origens"
                  size="lg"
                  emit-value
                  map-options
                  behavior="menu"
                  label="Destino"
                  use-input
                  :clearable="true"
                  class="w-full"
                ></o-select>
              </div>

              <div
                class="flex flex-nowrap gap-16 items-center md:flex-col w-full"
              >
                <o-select
                  v-model="informationVenda.banco"
                  :options="bancos"
                  use-input
                  size="lg"
                  behavior="menu"
                  emit-value
                  map-options
                  label="Banco"
                  :clearable="true"
                  class="w-full"
                ></o-select>
                <o-input
                  class="w-full pointer-events-none"
                  label="Valor"
                  size="lg"
                  v-model="informationVenda.valor"
                  readonly
                  reverse-fill-mask
                  prefix="R$"
                  placeholder="Até"
                  append-size="32px"
                >
                  <!-- mask="###.###.###.###.###,##" -->
                </o-input>
              </div>

              <div class="flex items-center gap-16 flex-nowrap md2:flex-col">
                <o-input
                  class="w-full"
                  label="Data de compra"
                  size="lg"
                  v-model="informationVenda.dataCompra"
                  placeholder="Input Date LG"
                  type="date"
                  mask="DD-MM-YYYY"
                  append-size="32px"
                >
                  <template v-slot:append>
                    <OButton rounded>
                      <q-icon name="calendar_today" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="informationVenda.dataCompra"
                            mask="YYYY-MM-DD"
                          >
                            <div class="row items-center justify-end">
                              <OButton
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </OButton>
                  </template>
                </o-input>
                <o-input
                  class="w-full"
                  label="Data de pagamento"
                  size="lg"
                  v-model="informationVenda.dataPagamento"
                  placeholder="Input Date LG"
                  type="date"
                  mask="DD-MM-YYYY"
                  append-size="32px"
                >
                  <template v-slot:append>
                    <OButton rounded>
                      <q-icon name="calendar_today" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="informationVenda.dataPagamento"
                            mask="YYYY-MM-DD"
                          >
                            <div class="row items-center justify-end">
                              <OButton
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </OButton>
                  </template>
                </o-input>
              </div>
              <o-input
                class="w-full"
                label="Descrição"
                size="lg"
                v-model="informationVenda.observacao"
                type="textarea"
                name="name"
              >
              </o-input>
            </div>
          </q-card>
          <q-card class="p-24 md2:w-[90vw] md2:mx-auto rounded-t-none">
            <div class="flex flex-col gap-16">
              <p class="text-headline-2">Produtos Comprados</p>
              <div
                class="flex gap-16 flex-nowrap md2:flex-col"
                v-for="(product, i) in listProduct"
                :key="product.id"
              >
                <o-select
                  v-model="product.idProduct"
                  :options="produtos"
                  emit-value
                  map-options
                  size="lg"
                  use-input
                  @input-search="
                    (value) => handleSearchProduto(value, product.id)
                  "
                  label="Produto"
                  :clearable="true"
                  class="w-full"
                ></o-select>
                <o-input
                  class="w-full"
                  reverse-fill-mask
                  label="Valor Unitário"
                  size="lg"
                  v-model="product.valor"
                  placeholder="Valor"
                  prefix="R$"
                  append-size="32px"
                  @keyup="(e) => maskCurrency(e, product)"
                >
                  <!-- unmasked-value -->
                  <!-- mask="###.###.###.###.###,##" -->
                </o-input>
                <o-input
                  class="input-qtd min-w-[11.75rem] md:w-full !text-center items-center mx-auto"
                  label="Quantidade"
                  size="lg"
                  v-model="product.qtd"
                  type="text"
                  name="name"
                >
                  <template v-slot:prepend>
                    <q-icon
                      class="cursor-pointer"
                      @click="() => subtractQuantity(product.id)"
                      size="1.5rem"
                      name="svguse:/icons.svg#icon_subtract_circle"
                    ></q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon
                      @click="() => addQuantity(product.id)"
                      class="cursor-pointer"
                      size="1.5rem"
                      name="svguse:/icons.svg#icon_add_circle"
                    ></q-icon>
                  </template>
                </o-input>
                <OButton
                  class="w-[80px] md2:w-full md2:mb-8"
                  size="lg"
                  secondary
                  v-if="i > 0"
                  @click="handleDeleteProductList(product.id)"
                >
                  <q-icon
                    size="1.5rem"
                    style="--cor-icon: rgba(233, 44, 44)"
                    name="svguse:/icons.svg#icon_delete"
                  ></q-icon>
                </OButton>
              </div>

              <div>
                <OButton secondary @click="addProductInList">
                  <q-icon
                    size="1.5rem"
                    style="--cor-icon: rgba(9, 18, 28, 0.4)"
                    name="svguse:/icons.svg#icon_add_circle"
                  ></q-icon>
                  Produto
                </OButton>
              </div>
            </div>
            <div class="flex justify-end mt-24 items-center gap-16">
              <OButton secondary>
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_close"
                  class="text-neutral-20"
                  style="--icon-color: rgba(9, 18, 28, 0.4)"
                ></q-icon>
                Cancelar
              </OButton>
              <OButton
                primary
                @click="cadastrarCompra"
                class="text-white"
                :disable="buttonInvalid || loading"
                :loading="loading"
              >
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_check"
                ></q-icon>
                Salvar compra
              </OButton>
            </div>
          </q-card>
        </main>
      </div>
    </q-scroll-area>
  </q-layout>
</template>

<script setup>
// import bgDre from 'src/assets/image/bg-login.png'
import bgDre from 'src/assets/image/bg-dre.png'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { ref, watch, onMounted } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import GLOBAL from 'src/utils/GLOBAL'
import { api } from 'src/boot/axios'

const modelVendedor = ref('')
const loading = ref(false)
const origemDefault = ref('')
const informationVenda = ref({
  fornecedor: '',
  destino: '',
  banco: '',
  dataCompra: '',
  dataPagamento: '',
  valor: '',
  observacao: '',
})

const {
  getVendedores,
  getCompradores,
  getProdutos,
  getOrigens,
  getFornecedores,
  getBancos,
} = useContextStore()
const { vendedores, compradores, produtos, origens, fornecedores, bancos } =
  storeToRefs(useContextStore())

const handleSearchProduto = (value, id) => {
  if (String(value).length >= 3) {
    getProdutos({
      search: value,
      is_active: true,
    })
  }
}
const listProduct = ref([
  {
    id: 1,
    idProduct: '',
    valor: '0',
    qtd: '1',
  },
])

const handleDeleteProductList = (id) => {
  listProduct.value = listProduct.value.filter((product) => product.id !== id)
}
const buttonInvalid = ref(true)

const maskCurrency = (event, product) => {
  const index = listProduct.value.findIndex((item) => item.id === product.id)
  if (index !== -1) {
    listProduct.value = listProduct.value.map((item, i) => {
      if (i === index) {
        const newValue = GLOBAL.currencyNotPrefix(
          String(event.target.value).replaceAll('.', '').replaceAll(',', '')
        )
        return {
          ...item,
          valor: isNaN(Number(String(newValue).replaceAll(',', '')))
            ? '-0,00'
            : newValue,
        }
      }
      return item
    })
  }
}

watch(
  () => [listProduct, informationVenda],
  () => {
    const total = listProduct.value.reduce((ac, product) => {
      ac +=
        Number(String(product.valor).replace(/[A-Z]| |\.|,/g, '')) *
        Number(product.qtd)
      return ac
    }, 0)
    informationVenda.value.valor = GLOBAL.currencyNotPrefix(total)
    const filledListProduct = listProduct.value.every((product) => {
      if (product.id && product.idProduct && product.qtd && product.valor) {
        return true
      }
      return false
    })
    const information = informationVenda.value
    const informationSale =
      information.fornecedor &&
      information.dataPagamento &&
      information.dataCompra &&
      // information.observacao &&
      information.destino &&
      // information.valor &&
      information.banco

    buttonInvalid.value = !informationSale || !filledListProduct
  },
  {
    deep: true,
    flush: 'post',
  }
)

watch(
  () => [origens?.value],
  async () => {
    origemDefault.value = origens.value
      .filter((origem) => origem.padrao)
      .map((origem) => origem.id)[0]

    informationVenda.value.destino =
      informationVenda.value.destino === ''
        ? origemDefault.value
        : informationVenda.value.origem
  },

  { deep: true }
)

const addProductInList = () => {
  listProduct.value.push({
    id: listProduct.value.length + 1,
    idProduct: '',
    valor: '',
    qtd: '1',
  })
}

const subtractQuantity = (id) => {
  listProduct.value = listProduct.value.map((product) => {
    if (product.id === id) {
      if (product.qtd <= 1) return product
      return {
        ...product,
        qtd: Number(product.qtd) - 1,
      }
    }
    return product
  })
}
const addQuantity = (id) => {
  listProduct.value = listProduct.value.map((product) => {
    if (product.id === id) {
      return {
        ...product,
        qtd: Number(product.qtd) + 1,
      }
    }
    return product
  })
}

const cadastrarCompra = () => {
  const formDataCompra = {
    data_compra: informationVenda.value.dataCompra,
    data_pagamento: informationVenda.value.dataPagamento,
    observacao: informationVenda.value.observacao,
    fornecedor: informationVenda.value.fornecedor,
    destino: informationVenda.value.destino,
    banco: informationVenda.value.banco,
  }
  loading.value = true
  api
    .post('/compra/', formDataCompra)
    .then(({ data: responseCompra }) => {
      listProduct.value.forEach(async (item, i) => {
        const data = {
          produto: item.idProduct,
          valor: GLOBAL.senderValueBack(
            String(item.valor).replaceAll('.', '').replaceAll(',', '') || 0
          ),
          quantidade: item.qtd,
          compra: responseCompra.id,
        }

        await api.post('/itemcompra/', data)

        if (listProduct.value.length - 1 === i) {
          Notify.create({
            type: 'positive',
            icon: '',
            iconColor: '#fff',
            message: `Compra cadastrada com sucesso :)`,
            position: 'top-right',
            timeout: 1500,
            html: true,
          })
        }
      })

      loading.value = false

      informationVenda.value = {
        fornecedor: '',
        destino: '',
        banco: '',
        dataCompra: '',
        dataPagamento: '',
        valor: '',
        observacao: '',
      }
      listProduct.value = [
        {
          id: 1,
          idProduct: '',
          valor: '',
          qtd: '1',
        },
      ]
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
      Notify.create({
        type: 'negative',
        icon: '',
        iconColor: '#fff',
        message: `Erro ao tentar cadastrar compra.`,
        position: 'top-right',
        timeout: 1500,
        html: true,
      })
    })
}

onMounted(() => {
  getVendedores()
  getCompradores()
  // getProdutos()
  getOrigens()
  getFornecedores({ page_size: '999' })
  getBancos()
})
window.global = GLOBAL
</script>

<style lang="sass">
.CadastrarCompra
    .input-qtd
      .q-placeholder
        text-align: center
</style>
