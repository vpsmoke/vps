<template>
  <q-layout class="CadastrarVenda" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <div class="h-full w-full absolute overflow-auto">
        <div
          class="h-[25rem] absolute w-full bg-d-neutral-40"
          :class="isRead && 'pointer-events-none'"
        >
          <q-img class="w-full h-full object-cover z-0" :src="bgDre" />
        </div>
        <main
          :class="isRead && 'pointer-events-none'"
          class="card-principal m-40 flex justify-center flex-col md2:w-full w-[53.5rem] max-w-[53.5rem] mx-auto"
        >
          <q-card
            class="flex flex-col gap-24 md2:w-[90vw] md2:mx-auto overflow-hidden p-24 rounded-b-none"
          >
            <div class="flex items-center gap-6">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_file_edit"
              ></q-icon>
              <p class="text-title-3">
                {{
                  idVenda
                    ? isRead
                      ? 'Conferir venda'
                      : 'Atualizar venda'
                    : 'Cadastrar venda'
                }}
              </p>
            </div>

            <div class="flex flex-col gap-16">
              <!-- use-input -->

              <div class="flex items-center gap-16 flex-nowrap md2:flex-col">
                <o-select
                  v-model="informationVenda.vendedor"
                  :options="vendedores"
                  size="lg"
                  emit-value
                  map-options
                  :loading="!vendedores"
                  label="Vendedor"
                  :clearable="true"
                  class="min-w-[200px] md:w-full md:min-w-full"
                ></o-select>

                <div class="flex w-full flex-nowrap items-center gap-8">
                  <o-select
                    v-model="informationVenda.comprador"
                    :options="compradores"
                    size="lg"
                    use-input
                    @input-search="handleSearchComprador"
                    emit-value
                    map-options
                    behavior="menu"
                    label="Comprador"
                    :clearable="true"
                    ref="select"
                    class="w-full"
                    :class="[
                      informationVenda.comprador
                        ? 'sm:!w-[200px] xs:!w-[180px]'
                        : '',
                    ]"
                    @update:modelValue="fetchDadosCliente"
                  ></o-select>

                  <OButton
                    v-show="informationVenda.comprador"
                    class="h-[47px] w-[55px] xs:w-[50px] !bg-transparent border border-solid !border-neutral-30 !border-l-tr hover:!bg-transparent transition-all duration-200 active:!bg-primary-pure-10"
                    @click="
                      () => {
                        newComprador = {}
                        fetchCliente()
                      }
                    "
                  >
                    <q-icon
                      size="1.25rem"
                      name="svguse:/icons.svg#icon_edit"
                    ></q-icon>
                  </OButton>
                  <OButton
                    class="h-[47px] w-[55px] xs:w-[50px] !bg-transparent border border-solid !border-neutral-30 !border-l-tr hover:!bg-transparent transition-all duration-200 active:!bg-primary-pure-10"
                    @click="
                      () => {
                        newComprador = {}
                        dialogRef.show()
                      }
                    "
                  >
                    <q-icon
                      size="1.25rem"
                      name="svguse:/icons.svg#icon_add_circle"
                    ></q-icon>
                  </OButton>
                </div>
                <o-select
                  v-model="informationVenda.faixa_horario"
                  :options="[
                    { value: 'manhã', label: 'Manhã' },
                    { value: 'tarde', label: 'Tarde' },
                    { value: 'noite', label: 'Noite' },
                  ]"
                  size="lg"
                  emit-value
                  use-input
                  map-options
                  behavior="menu"
                  label="Turno"
                  :clearable="true"
                  ref="select"
                  class="w-full max-w-[200px] md:w-full md:max-w-full"
                ></o-select>
              </div>

              <div
                class="grid grid-cols-12 gap-16 items-center md:flex-col w-full"
              >
                <o-input
                  class="col-span-3 md:col-span-full"
                  label="Data de Venda"
                  size="lg"
                  v-model="informationVenda.dataVenda"
                  placeholder="De"
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
                            v-model="informationVenda.dataVenda"
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
                  class="col-span-3 md:col-span-full"
                  label="Horário de saída"
                  size="lg"
                  placeholder="00:00"
                  name="horario_saida"
                  mask="time"
                  v-model="informationVenda.horario_saida"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="informationVenda.horario_saida"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </o-input>

                <o-input
                  class="col-span-3 md:col-span-full"
                  label="Horário de entrega"
                  size="lg"
                  placeholder="00:00"
                  type="text"
                  name="horario_entrega"
                  mask="time"
                  v-model="informationVenda.horario_entrega"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="informationVenda.horario_entrega"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </o-input>
                <o-select
                  v-model="informationVenda.formaPagamento"
                  :options="[
                    { value: 'Vazio', label: 'Vazio' },
                    { value: 'Dinheiro', label: 'Dinheiro' },
                    { value: 'Pix', label: 'Pix' },
                    { value: 'Cartão', label: 'Cartão' },
                    { value: 'PicPay', label: 'PicPay' },
                    { value: 'Reposição', label: 'Reposição' },
                    { value: 'Cortesia', label: 'Cortesia' },
                    { value: 'Equilibrio de Estoque', label: 'Equilibrio de Estoque' },
                  ]"
                  size="lg"
                  emit-value
                  use-input
                  map-options
                  behavior="menu"
                  label="Forma de pagamento"
                  :clearable="true"
                  ref="select"
                  class="col-span-3 md:col-span-full"
                ></o-select>
              </div>
              <div class="grid grid-cols-12 gap-16 md:flex-col w-full">
                <o-input
                  class="col-span-3 md:col-span-full"
                  label="Data de Pagamento"
                  size="lg"
                  v-model="informationVenda.dataPagamento"
                  placeholder="Até"
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

                <o-input
                  class="col-span-3 md:col-span-full pointer-events-none"
                  label="Valor Prod."
                  size="lg"
                  v-model="informationVenda.valor"
                  readonly
                  reverse-fill-mask
                  prefix="R$"
                  placeholder="Até"
                  append-size="32px"
                >
                </o-input>

                <o-input
                  class="col-span-3 md:col-span-full"
                  label="Valor Frete"
                  size="lg"
                  v-model="informationVenda.valor_frete"
                  reverse-fill-mask
                  prefix="R$"
                  append-size="32px"
                  @keyup="(e) => maskCurrencyFrete(e)"
                >
                </o-input>
                <o-input
                  class="col-span-3 md:col-span-full pointer-events-none"
                  label="Valor Total"
                  size="lg"
                  v-model="valorTotal"
                  readonly
                  reverse-fill-mask
                  prefix="R$"
                  placeholder="Até"
                  append-size="32px"
                >
                </o-input>
                <o-input
                  class="col-span-12"
                  label="Descrição"
                  size="lg"
                  v-model="informationVenda.observacao"
                  type="textarea"
                  name="name"
                >
                </o-input>
              </div>
            </div>
          </q-card>
          <q-card class="p-24 md2:w-[90vw] md2:mx-auto rounded-t-none">
            <div class="flex flex-col gap-16">
              <p class="text-headline-2">Produto vendido</p>
              <div
                class="flex gap-16 flex-nowrap md2:flex-col relative"
                v-for="(product, i) in listProduct"
                :key="product.id"
              >
                <div class="flex w-full flex-nowrap items-center gap-8">
                  <o-select
                    v-model="product.idProduct"
                    :options="produtos"
                    emit-value
                    map-options
                    use-input
                    size="lg"
                    @input-search="
                      (value) => handleSearchProduto(value, product.id)
                    "
                    label="Produto"
                    :clearable="true"
                    class="w-full"
                  ></o-select>
                </div>

                <o-input
                  class="w-full"
                  label="Valor Unitário"
                  size="lg"
                  v-model="product.valor"
                  placeholder="Até"
                  prefix="R$"
                  append-size="32px"
                  reverse-fill-mask
                  @keyup="(e) => maskCurrency(e, product)"
                >
                </o-input>

                <o-input
                  class="input-qtd min-w-[11.75rem] md:w-full !text-center"
                  label="Qtd"
                  size="lg"
                  autocomplete="off"
                  v-model="product.qtd"
                  type="text"
                  name="name"
                >
                  <template v-slot:prepend>
                    <q-icon
                      @click="() => subtractQuantity(product.id)"
                      class="cursor-pointer"
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

            <q-dialog ref="dialogRef" @hide="onDialogHide">
              <q-card class="p-24 py-16 w-[400px]">
                <q-form @submit="onSubmit" class="flex flex-col gap-12">
                  <p class="text-title-3 text-center">Cadastrar Comprador</p>
                  <o-input
                    class="w-full"
                    label="Nome"
                    size="lg"
                    v-model="newComprador.nome"
                  >
                  </o-input>
                  <o-input
                    class="w-full"
                    label="Data de Nascimento"
                    size="lg"
                    v-model="newComprador.data_nascimento"
                    placeholder="De"
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
                              v-model="newComprador.data_nascimento"
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
                  <o-select
                    v-model="newComprador.genero"
                    :options="[
                      { value: 'Masculino', label: 'Masculino' },
                      { value: 'Feminino', label: 'Feminino' },
                      { value: 'NSA', label: 'NSA' },
                    ]"
                    size="lg"
                    emit-value
                    use-input
                    map-options
                    behavior="menu"
                    label="Gênero"
                    :clearable="true"
                    ref="select"
                    class="w-full"
                  ></o-select>

                  <MazPhoneNumberInput
                    v-model="newComprador.whatsapp"
                    color="info"
                    :defaultCountryCode="newComprador.prefixo"
                    :preferred-countries="['FR', 'BE', 'DE', 'US', 'GB']"
                    :ignored-countries="['AC']"
                    @update="results = $event"
                    :success="results?.isValid"
                  />
                  <o-select
                    v-model="newComprador.fk_bairro"
                    :options="optionsFilter.bairros"
                    emit-value
                    map-options
                    use-input
                    size="lg"
                    behavior="menu"
                    label="Bairro"
                    class="w-full"
                    :clearable="true"
                  ></o-select>

                  <q-card-actions align="right">
                    <OButton
                      :disable="
                        !newComprador.nome ||
                        !newComprador.genero ||
                        !newComprador.whatsapp ||
                        !newComprador.fk_bairro
                      "
                      :loading="loading"
                      class="h-48 bg-primary-pure text-white"
                      type="submit"
                    >
                      Cadastrar
                    </OButton>
                    <OButton
                      @click="onDialogCancel"
                      class="h-48 bg-alert-error/90 text-white"
                      type="submit"
                    >
                      Cancelar
                    </OButton>
                  </q-card-actions>
                </q-form>
              </q-card>
            </q-dialog>

            <q-dialog ref="dialogRefEdit" @hide="dialogRefEdit.onDialogHide">
              <q-card class="p-24 py-16 w-[400px]">
                <q-form @submit="onSubmitEdit" class="flex flex-col gap-12">
                  <p class="text-title-3 text-center">Editar Comprador</p>
                  <o-input
                    class="w-full"
                    label="Nome"
                    size="lg"
                    v-model="newComprador.nome"
                  >
                  </o-input>
                  <o-input
                    class="w-full"
                    label="Data de Nascimento"
                    size="lg"
                    v-model="newComprador.data_nascimento"
                    placeholder="De"
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
                              v-model="newComprador.data_nascimento"
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
                  <o-select
                    v-model="newComprador.genero"
                    :options="[
                      { value: 'Masculino', label: 'Masculino' },
                      { value: 'Feminino', label: 'Feminino' },
                      { value: 'NSA', label: 'NSA' },
                    ]"
                    size="lg"
                    emit-value
                    use-input
                    map-options
                    behavior="menu"
                    label="Gênero"
                    :clearable="true"
                    ref="select"
                    class="w-full"
                  ></o-select>
                  <MazPhoneNumberInput
                    v-model="newComprador.whatsapp"
                    color="info"
                    :defaultCountryCode="newComprador.prefixo"
                    :preferred-countries="['FR', 'BE', 'DE', 'US', 'GB']"
                    :ignored-countries="['AC']"
                    @update="results = $event"
                    :success="results?.isValid"
                  />
                  <o-select
                    v-model="newComprador.fk_bairro"
                    :options="optionsFilter.bairros"
                    emit-value
                    map-options
                    size="lg"
                    behavior="menu"
                    label="Bairro"
                    class="w-full"
                    :clearable="true"
                  ></o-select>
                  <q-card-actions align="right">
                    <OButton
                      :disable="!newComprador.nome"
                      :loading="loading"
                      class="h-48 bg-primary-pure text-white"
                      type="submit"
                    >
                      Editar
                    </OButton>
                    <OButton
                      @click="dialogRefEdit.hide"
                      class="h-48 bg-alert-error/90 text-white"
                    >
                      Cancelar
                    </OButton>
                  </q-card-actions>
                </q-form>
              </q-card>
            </q-dialog>

            <div
              v-if="!isRead"
              class="flex justify-end mt-24 items-center gap-16"
            >
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
                :class="[
                  buttonInvalid || loading
                    ? 'opacity-60 pointer-events-none'
                    : '',
                ]"
                :loading="loading"
                @click="cadastrarVenda"
                primary
                class="text-white"
              >
                <q-icon
                  size="1.5rem"
                  name="svguse:/icons.svg#icon_check"
                ></q-icon>
                {{ idVenda ? 'Editar venda' : 'Salvar venda' }}
              </OButton>
            </div>
          </q-card>
        </main>
      </div>
    </q-scroll-area>
  </q-layout>
</template>

<script setup>
import bgDre from 'src/assets/image/bg-dre.png'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { ref, onMounted, watch, computed } from 'vue'
import OSelect from 'src/components/Select/OSelect.vue'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import { Notify, useDialogPluginComponent } from 'quasar'
import GLOBAL from 'src/utils/GLOBAL'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import moment from 'moment'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const router = useRouter()
const { id: idVenda, mode } = router?.currentRoute?.value.params
const dialogRefEdit = ref(Element)
const {
  getVendedores,
  getCompradores,
  getProdutos,
  getOrigens,
  getDetailsCurrentUser,
  setProdutos,
  setCompradores,
  getComprador,
  getBairros,
} = useContextStore()
const { vendedores, compradores, produtos, origens, currentUser, bairros } =
  storeToRefs(useContextStore())
const vendedoresAcesso = ref([])
const user = ref()
const isRead = ref(mode === 'read')
const results = ref()
const newComprador = ref({
  nome: '',
  whatsapp: '',
  email: '',
  data_nascimento: '',
  genero: '',
  prefixo: '',
  fk_bairro: '',
  frete: '',
})

const dadosCliente = ref({
  nome: '',
  whatsapp: '',
  email: '',
  data_nascimento: '',
  genero: '',
  prefixo: '',
  fk_bairro: '',
  frete: '',
})
const origemDefault = ref({})
const vendedorDefault = ref({})
const loading = ref(false)
const informationVenda = ref({
  comprador: '',
  origem: '',
  vendedor: '',
  dataVenda: '',
  dataPagamento: '',
  valor: '',
  valor_frete: '0,00',
  faixa_horario: '',
  tempo_entrega: '',
  horario_saida: '',
  horario_entrega: '',
  observacao: '',
  formaPagamento: '',
})

const listProduct = ref([
  {
    id: 1,
    idProduct: '',
    valor: '0',
    qtd: '1',
    new: true,
  },
])
const buttonInvalid = ref(true)
const lastSearch = ref('')

const optionsFilter = ref({
  bairros,
})

watch(
  () => [results.value],
  async () => {
    newComprador.value.prefixo = results.value.countryCode
  }
)

const valorTotal = computed(() => {
  const valor = GLOBAL.currencyNotPrefix(
    String(informationVenda.value.valor).replaceAll('.', '').replaceAll(',', '')
  )
  const valorFrete = GLOBAL.currencyNotPrefix(
    String(informationVenda.value.valor_frete)
      .replaceAll('.', '')
      .replaceAll(',', '')
  )

  if (valor && valorFrete) {
    return GLOBAL.currencyNotPrefix(
      Number(String(valor).replaceAll('.', '').replaceAll(',', '')) +
        Number(String(valorFrete).replaceAll('.', '').replaceAll(',', ''))
    )
  }

  return '0,00'
})

const maskCurrency = (event, product) => {
  const index = listProduct.value.findIndex((item) => item.id === product.id)
  if (index !== -1) {
    listProduct.value = listProduct.value.map((item, i) => {
      if (i === index) {
        console.log('NEW', {
          ...item,
          valor: GLOBAL.currencyNotPrefix(
            String(event.target.value).replaceAll('.', '').replaceAll(',', '')
          ),
        })
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

const maskCurrencyFrete = (event) => {
  informationVenda.value.valor_frete = GLOBAL.currencyNotPrefix(
    String(event.target.value).replaceAll('.', '').replaceAll(',', '')
  )
  const newValue = GLOBAL.currencyNotPrefix(
    String(event.target.value).replaceAll('.', '').replaceAll(',', '')
  )

  informationVenda.value.valor_frete = isNaN(
    Number(String(newValue).replaceAll(',', ''))
  )
    ? '-0,00'
    : newValue
}

const handleSearchComprador = (value) => {
  lastSearch.value = value
  if (String(value).length >= 3) {
    getCompradores({
      search: value,
    })
  }
}

const handleSearchProduto = (value, id) => {
  if (String(value).length >= 3) {
    getProdutos({
      search: value,
      is_active: true,
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
      if (product.id && product.idProduct && product.qtd) {
        return true
      }
      return false
    })

    const information = informationVenda.value

    console.log('information', information)

    const informationSale =
      information.comprador &&
      // information.dataPagamento &&
      information.dataVenda &&
      // information.observacao &&
      // information.origem &&
      information.vendedor &&
      information.faixa_horario

    buttonInvalid.value = !informationSale || !filledListProduct
  },

  {
    deep: true,
    flush: 'post',
  }
)

watch(
  () => [buttonInvalid.value],
  () => {
    console.log(informationVenda.value)
    console.log(listProduct.value)
  }
)

async function onSubmit() {
  loading.value = true

  api
    .post('/cliente/', newComprador.value)
    .then(({ data }) => {
      Notify.create({
        type: 'positive',
        icon: '',
        iconColor: '#fff',
        message: `Comprador cadastrado com sucesso :)`,
        position: 'top',
        timeout: 2500,
        html: true,
      })
      getCompradores({
        search: lastSearch.value,
      })
      newComprador.value = {}
    })
    .catch((err) => {
      Notify.create({
        type: 'negative',
        icon: '',
        iconColor: '#fff',
        message: `Erro ao tentar cadastrar comprador.`,
        position: 'top-right',
        timeout: 1500,
        html: true,
      })
      return err
    })
    .finally(() => {
      loading.value = false
      onDialogCancel()
    })
}

async function onSubmitEdit() {
  loading.value = true
  api
    .put(`/cliente/${informationVenda.value.comprador}/`, newComprador.value)
    .then(({ data }) => {
      Notify.create({
        type: 'positive',
        icon: '',
        iconColor: '#fff',
        message: `Comprador editado com sucesso :)`,
        position: 'top',
        timeout: 2500,
        html: true,
      })
      getCompradores({
        search: lastSearch.value,
      })
      newComprador.value = {}
    })
    .catch((err) => {
      Notify.create({
        type: 'negative',
        icon: '',
        iconColor: '#fff',
        message: `Erro ao tentar editar comprador.`,
        position: 'top-right',
        timeout: 1500,
        html: true,
      })
      return err
    })
    .finally(() => {
      loading.value = false
      dialogRefEdit.value.hide()
    })
}

watch(
  () => [origens?.value],
  async () => {
    origemDefault.value = origens.value
      .filter((origem) => origem.padrao)
      .map((origem) => origem.id)[0]

    informationVenda.value.origem =
      informationVenda.value.origem === ''
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

const handleDeleteProductList = (id) => {
  listProduct.value = listProduct.value.filter((product) => product.id !== id)
}

const cadastrarVenda = () => {
  const formDataVenda = {
    data_venda: informationVenda.value.dataVenda,
    data_pagamento: informationVenda.value.dataPagamento
      ? informationVenda.value.dataPagamento
      : null,
    observacoes: informationVenda.value.observacao,
    vendedor: informationVenda.value.vendedor,
    cliente: informationVenda.value.comprador,
    origem: informationVenda.value.origem,
    forma_pagamento: informationVenda.value.formaPagamento,
    regiao: null,
    faixa_horario: informationVenda.value.faixa_horario,
    horario_saida: informationVenda.value.horario_saida,
    horario_entrega: informationVenda.value.horario_entrega,
    tempo_entrega: informationVenda.value.tempo_entrega,
    valor_frete: GLOBAL.senderValueBack(
      String(informationVenda.value.valor_frete)
        .replaceAll('.', '')
        .replaceAll(',', '')
    ),
  }

  if (idVenda) {
    loading.value = true
    api
      .put(`/venda/${idVenda}/`, formDataVenda)
      .then(({ data: responseVenda }) => {
        listProduct.value.forEach(async (item, i) => {
          console.log('VALORRRRRRRRR', item.valor)
          const data = {
            produto: item.idProduct,
            valor: GLOBAL.senderValueBack(
              String(item.valor).replaceAll('.', '').replaceAll(',', '')
            ),
            quantidade: item.qtd,
            venda: responseVenda.id,
          }
          if (item.new) {
            await api.post('/itemvenda/', data)
          } else {
            await api.put(`/itemvenda/${item.id}/`, data)
          }

          if (listProduct.value.length - 1 === i) {
            Notify.create({
              type: 'positive',
              icon: '',
              iconColor: '#fff',
              message: `Venda editada com sucesso :)`,
              position: 'top-right',
              timeout: 2500,
              html: true,
            })
          }
        })

        loading.value = false
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
        Notify.create({
          type: 'negative',
          icon: '',
          iconColor: '#fff',
          message: `Erro ao tentar atualizar venda`,
          position: 'top-right',
          timeout: 1500,
          html: true,
        })
      })

    return
  }

  loading.value = true
  api
    .post('/venda/', formDataVenda)
    .then(({ data: responseVenda }) => {
      listProduct.value.forEach(async (item, i) => {
        const data = {
          produto: item.idProduct,
          valor: GLOBAL.senderValueBack(
            String(item.valor).replaceAll('.', '').replaceAll(',', '')
          ),
          quantidade: item.qtd,
          venda: responseVenda.id,
        }

        await api.post('/itemvenda/', data)

        if (listProduct.value.length - 1 === i) {
          Notify.create({
            type: 'positive',
            icon: '',
            iconColor: '#fff',
            message: `Venda cadastrada com sucesso :)`,
            position: 'top-right',
            timeout: 2500,
            html: true,
          })
        }
      })

      informationVenda.value = {
        ...informationVenda.value,
        comprador: '',
        origem: origemDefault.value,
        // vendedor: '',
        // dataVenda: '',
        // dataPagamento: '',
        formaPagamento: '',
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

      loading.value = false
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
      Notify.create({
        type: 'negative',
        icon: '',
        iconColor: '#fff',
        message: `Erro ao tentar cadastrar venda`,
        position: 'top-right',
        timeout: 1500,
        html: true,
      })
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

const currentVendedorHasAccess = (idVendedor) => {
  const result = vendedoresAcesso.value.some(
    (vendedor) => vendedor.id === idVendedor
  )
  return result
}

const fetchCliente = async () => {
  // console.log('dados cliente', informationVenda)
  const cliente = await getComprador({}, informationVenda.value.comprador)
  console.log('cliente', cliente)
  newComprador.value = {
    ...cliente,
  }
  console.log('newComprador', newComprador.value)
  Object.entries(newComprador.value).forEach(([col, val]) => {
    console.log(col, val)
    if (!val) {
      delete newComprador.value[col]
    }
  })
  dialogRefEdit.value.show()
}

const fetchDadosCliente = async () => {
  const cliente = await getComprador({}, informationVenda.value.comprador)
  console.log('cliente', cliente)
  dadosCliente.value = {
    ...cliente,
  }
  Object.entries(dadosCliente.value).forEach(([col, val]) => {
    console.log(col, val)
    if (!val) {
      delete newComprador.value[col]
    }
  })
  informationVenda.value.valor_frete = Number(dadosCliente.value.frete)
    .toFixed(2)
    .replace('.', ',')
}

const isEditing = async () => {
  if (idVenda) {
    const { data } = await api.get(`/venda/${idVenda}`)
    const readonly = router?.currentRoute.value.params
    console.log('USERRRRRRRRRRRRRRRRRR', user.value)

    informationVenda.value = {
      comprador: data.cliente,
      origem: data.origem,
      vendedor: data.vendedor,
      dataVenda: data.data_venda,
      dataPagamento: data.data_pagamento,
      valor: data.valor_total,
      observacao: data.observacoes,
      formaPagamento: data.forma_pagamento,
      faixa_horario: data.faixa_horario,
      tempo_entrega: data.tempo_entrega,
      horario_saida: data.horario_saida,
      horario_entrega: data.horario_entrega,
      valor_frete: data.valor_frete,
    }

    if (informationVenda.value.comprador) {
      const comprador = await getComprador(
        {},
        `${informationVenda.value.comprador}`
      )

      setCompradores([{ value: comprador.id, label: comprador.nome }])
    }

    // Buscando produtos da venda
    const { data: allProducts } = await api.get(`/itemvenda/?venda=${idVenda}`)
    const results = allProducts.results
    const productsSelecteds = []
    listProduct.value = results.map((item, i) => {
      api.get(`/produto/${item.produto}`).then(({ data }) => {
        const product = {
          value: data.id,
          label: data.nome,
        }
        setProdutos([...productsSelecteds, product])
        productsSelecteds.push(product)
      })

      return {
        id: item.id,
        idProduct: item.produto,
        valor: item.valor,
        qtd: item.quantidade,
        new: false,
      }
    })
  }
}

const isDetails = () => {
  const readonly = router?.currentRoute?.value.meta

  if (
    readonly.teste === 'read' ||
    router.currentRoute.value.params.mode === 'read'
  ) {
    const layout = document.querySelector('.card-principal')
    layout.classList.add('pointer-events-none')
  } else {
    console.log('Não é detalhe')
  }
}

watch(
  () => [vendedores.value, currentUser.value],
  () => {
    if (idVenda) return
    vendedorDefault.value = vendedores.value.find(
      (vendedor) => vendedor.usuario_logado === currentUser.value.id
    ).value

    if (vendedorDefault.value) {
      informationVenda.value.vendedor = !informationVenda.value.vendedor
        ? vendedorDefault.value
        : informationVenda.value.vendedor
    }
  },
  {
    deep: true,
  }
)

onMounted(async () => {
  user.value = await getDetailsCurrentUser()
  vendedoresAcesso.value = await getVendedores({ usuario: user.value.id })
  await getBairros()
  await getVendedores()
  await getDetailsCurrentUser()
  await getOrigens()
  isEditing()
  isDetails()
  informationVenda.value.dataVenda = moment().format('YYYY-MM-DD')
  informationVenda.value.dataPagamento = moment().format('YYYY-MM-DD')
})
</script>

<style lang="sass">
.CadastrarVenda
  .q-field.input-qtd
    .q-field__native
        text-align: center
</style>
