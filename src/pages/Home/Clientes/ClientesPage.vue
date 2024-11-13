<template>
  <q-layout class="VendasPage" view="hHh lpR fFf" style="height: 100vh">
    <q-scroll-area style="height: calc(100vh - 51px)">
      <main class="m-40">
        <q-card>
          <div
            class="flex justify-between items-center p-24 pb-0 md:flex-wrap div-title"
          >
            <div class="flex items-center gap-8">
              <q-icon
                size="1.5rem"
                name="svguse:/icons.svg#icon_vendas"
              ></q-icon>
              <p class="text-title-3">Clientes</p>
            </div>
            <div class="flex items-center gap-8">
              <!-- icon="svguse:/icons.svg#icon_user" -->
              <OButton
                size="lg"
                secondary
                class="new-venda"
                @click="openModalMelhoresClientes"
                >Melhores Clientes</OButton
              >
              <OButton
                size="lg"
                primary
                text-color="white"
                icon="svguse:/icons.svg#icon_add_circle_white"
                class="new-venda"
                @click="
                  () => {
                    newComprador = {}
                    dialogRef.show()
                  }
                "
                >Novo cliente</OButton
              >
            </div>
          </div>

          <o-table
            :filter="searchTable"
            class="w-full flex-nowrap p-24"
            :rows="rows"
            :columns="columns"
            row-key="name"
            secondary
            separator="cell"
            @request="getCompradoresTabela"
            v-model:pagination="initialPagination"
          >
            <template v-slot:top-left>
              <o-input
                size="md"
                debounce="300"
                v-model="searchTable"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </o-input>
            </template>

            <template v-slot:top-right>
              <div class="flex flex-1 justify-end gap-32 items-center">
                <OButton
                  @click="initExportTable()"
                  class="sm:w-full w-max"
                  :class="[
                    loadingExcel ? 'opacity-70 pointer-events-none' : '',
                  ]"
                  size="md"
                  primary
                  text-color="white"
                  :loading="loadingExcel"
                  icon="svguse:/icons.svg#icon_xlsx"
                >
                  Exportar tabela
                </OButton>

                <div class="flex gap-8 items-center">
                  <p>Mostrar</p>
                  <o-select
                    v-model="modelViewPerPage"
                    class="min-w-[4.625rem]"
                    :options="optionsViewPerPage"
                    size="md"
                    option-label
                    behavior="menu"
                    :clearable="true"
                  ></o-select>
                  <p>Linhas por página</p>
                </div>
              </div>
            </template>

            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  @click="(e) => handleSort(col.name)"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr
                :props="props"
                @click.prevent="handleClickEdit(props.row.id)"
                class="cursor-pointer"
              >
                <q-td key="id" :props="props" class="!w-[100px]">
                  {{ props.row.id }}
                </q-td>
                <q-td key="nome" :props="props">
                  {{ props.row.nome }}
                </q-td>
                <q-td key="data_nascimento" :props="props" class="!w-[140px]">
                  {{
                    props.row.data_nascimento
                      ? moment(props.row.data_nascimento).format('DD/MM/YYYY')
                      : ''
                  }}
                </q-td>
                <q-td key="genero" :props="props" class="!w-[100px]">
                  {{ props.row.genero }}
                </q-td>
                <q-td key="whatsapp" :props="props" class="!w-[100px]">
                  {{ props.row.whatsapp }}
                </q-td>
                <q-td key="bairro" :props="props">
                  {{ props.row.bairro_read?.nome_bairro }}
                </q-td>

                <q-td key="ultimo_vendedor" :props="props">
                  {{ props.row.ultimo_vendedor }}
                </q-td>
                <q-td
                  key="actions"
                  :props="props"
                  class="flex items-center justify-center"
                  @click.stop
                >
                  <div class="!w-max flex gap-8 items-center justify-between">
                    <OButton
                      @click.stop="handleClickEdit(props.row.id)"
                      size="sm"
                      secondary
                      icon="svguse:/icons.svg#icon_edit"
                    ></OButton>
                    <OButton
                      size="sm"
                      secondary
                      icon="svguse:/icons.svg#icon_trash"
                      @click.stop="handleClickDelete(props.row.id)"
                    ></OButton>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </o-table>
        </q-card>
      </main>
    </q-scroll-area>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
      <q-card class="p-24 py-16 w-[400px]">
        <q-form @submit="onSubmit" class="flex flex-col gap-12">
          <p class="text-title-3 text-center">
            {{ newComprador.id ? 'Editar Cliente' : 'Cadastrar Cliente' }}
          </p>
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
          <!-- <o-input
            class="w-full"
            label="WhatsApp"
            size="lg"
            unmasked-value
            mask="## #####-####"
            v-model="newComprador.whatsapp"
            prefix="+55"
            append-size="32px"
          >
          </o-input> -->
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
            use-input
            behavior="menu"
            label="Bairro"
            class="w-full"
            :clearable="true"
          ></o-select>
          <!-- <o-input
            class="w-full"
            label="Email"
            size="lg"
            type="email"
            v-model="newComprador.email"
          >
          </o-input> -->
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
              {{ newComprador.id ? 'Editar' : 'Cadastrar' }}
            </OButton>
            <OButton
              @click="onDialogCancel"
              class="h-48 bg-alert-error/90 text-white"
            >
              Cancelar
            </OButton>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog ref="dialogDelete" @hide="onDialogHide">
      <q-card class="p-12 py-10 w-[400px]">
        <q-form class="flex items-center">
          <p class="text-title-4 p-8 text-center">
            Deseja realmente deletar essa venda?
          </p>
          <q-card-actions class="w-full flex justify-end">
            <OButton
              class="h-48 bg-primary-pure text-white flex-1"
              @click="dialogDelete.hide()"
            >
              Cancelar
            </OButton>
            <OButton
              :loading="loading"
              class="h-48 bg-alert-error/90 text-white flex-1"
              @click="handleDelete(dialogDelete.idDelete)"
            >
              Sim, desejo
            </OButton>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <ModalMelhoresClientes ref="modalMelhoresClientesRef" />
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import OTable from 'src/components/Table/OTable.vue'
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import { columns, prepareRel } from './data'
import { Notify, QField, useDialogPluginComponent } from 'quasar'
import { useContextStore } from 'src/stores/context/context.store'
import { storeToRefs } from 'pinia'
import GLOBAL from 'src/utils/GLOBAL'
import ModalMelhoresClientes from 'src/components/Modal/ModalMelhoresClientes.vue'
import { api } from 'src/boot/axios'
import moment from 'moment'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
const { getCompradores, getComprador, getBairros, getMelhoresClientes } =
  useContextStore()
const { bairros, melhoresClientes } = storeToRefs(useContextStore())
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
const dialogDelete = ref(Element)
const rows = ref([])
const modelViewPerPage = ref('5')
const searchTable = ref('')
const optionsViewPerPage = ref(['5', '10', '15', '20', '25', '50'])
const initialPagination = ref({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
  sortBy: 'nome',
  descending: false,
})
const results = ref()

const newComprador = ref({
  nome: '',
  whatsapp: '',
  email: '',
  fk_bairro: null,
  data_nascimento: '',
  genero: '',
  prefixo: '',
})

const modalMelhoresClientesRef = ref(null)

const loading = ref(false)
const loadingExcel = ref(false)

const optionsFilter = ref({
  bairros,
})

watch(
  () => [modelViewPerPage.value],
  async () => {
    initialPagination.value.rowsPerPage = modelViewPerPage.value || 5
    getCompradoresTabela({ pagination: initialPagination.value })
  }
)

watch(
  () => [results.value],
  async () => {
    console.log('evrno', results)
    newComprador.value.prefixo = results.value.countryCode
  }
)

const handleSort = (col) => {
  initialPagination.value.descending = !initialPagination.value.descending
  initialPagination.value.sortBy = col
}

const handleClickEdit = async (id) => {
  const data = await getComprador({}, id)
  newComprador.value = {
    ...data,
  }
  dialogRef.value.show()
}

const handleClickDelete = (id) => {
  dialogDelete.value.show()
  dialogDelete.value.idDelete = id
}

watch(
  () => newComprador.value.whatsapp,
  () => {
    console.log(newComprador.value)
    console.log(results.value)
  }
)

const handleDelete = (id) => {
  loading.value = true
  api
    .delete(`/cliente/${id}/`)
    .then(({ data }) => {
      Notify.create({
        type: 'positive',
        icon: '',
        iconColor: '#fff',
        message: `Cliente deletado com sucesso :)`,
        position: 'top',
        timeout: 2500,
        html: true,
      })
      getCompradoresTabela({
        pagination: initialPagination.value,
      })
    })
    .catch((err) => {
      Notify.create({
        type: 'negative',
        icon: '',
        iconColor: '#fff',
        message: `Erro ao tentar deletar cliente.`,
        position: 'top-right',
        timeout: 1500,
        html: true,
      })
      return err
    })
    .finally(() => {
      loading.value = false
      dialogDelete.value.hide()
    })
}

const getCompradoresTabela = async (props) => {
  const { page, rowsPerPage } = props.pagination

  const data = await getCompradores({
    search: searchTable.value,
    page,
    page_size: rowsPerPage,
  })

  const col = initialPagination.value.sortBy
  const sortFn = initialPagination.value.descending
    ? (a, b) => (a[col] > b[col] ? -1 : a[col] < b[col] ? 1 : 0)
    : (a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0)
  rows.value = data.results.sort(sortFn)

  initialPagination.value = {
    ...initialPagination.value,
    rowsNumber: data.count,
    page,
  }

  return data
}

const openModalMelhoresClientes = async () => {
  await getMelhoresClientes()
  modalMelhoresClientesRef.value.setState({
    header: {
      hidden: false,
      title: 'Melhores Clientes',
    },

    style: { width: '42rem', minHeight: '25rem' },

    data: {
      melhores_clientes: melhoresClientes.value,
    },
  })
  modalMelhoresClientesRef.value.open()
}

async function onSubmit() {
  loading.value = true
  if (newComprador.value.id) {
    api
      .put(`/cliente/${newComprador.value.id}/`, newComprador.value)
      .then(({ data }) => {
        Notify.create({
          type: 'positive',
          icon: '',
          iconColor: '#fff',
          message: `Cliente editado com sucesso :)`,
          position: 'top',
          timeout: 2500,
          html: true,
        })
        getCompradoresTabela({
          pagination: initialPagination.value,
        })
        newComprador.value = {}
      })
      .catch((err) => {
        Notify.create({
          type: 'negative',
          icon: '',
          iconColor: '#fff',
          message: `Erro ao tentar cadastrar cliente.`,
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
  } else {
    console.log('CLIENTE', newComprador.value)
    api
      .post('/cliente/', newComprador.value)
      .then(({ data }) => {
        Notify.create({
          type: 'positive',
          icon: '',
          iconColor: '#fff',
          message: `Cliente cadastrado com sucesso :)`,
          position: 'top',
          timeout: 2500,
          html: true,
        })
        getCompradoresTabela({
          pagination: initialPagination.value,
        })
        newComprador.value = {}
      })
      .catch((err) => {
        Notify.create({
          type: 'negative',
          icon: '',
          iconColor: '#fff',
          message: `Erro ao tentar cadastrar cliente.`,
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
}

const initExportTable = async () => {
  console.log('SEArch', searchTable.value)
  loadingExcel.value = true
  await prepareRel(
    `/cliente/?page_size=9999&search=${searchTable.value}`,
    'clientes_page'
  )
  loadingExcel.value = false
}

onMounted(async () => {
  await getBairros()
  getCompradoresTabela({
    pagination: initialPagination.value,
  })
})
</script>
