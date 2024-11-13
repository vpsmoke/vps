<!-- eslint-disable vue/no-setup-props-destructure -->
<template>
  <o-accordion
    @show="(e) => handleShow(accordion)"
    @hide="(e) => handleHidden(accordion)"
    :id="accordion?.vendedor?.id"
    class="accordion accordion-contas-receber md2:w-full border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden"
  >
    <template v-slot:header>
      <div
        class="flex justify-between w-full items-center md2:flex-col md2:gap-8"
      >
        <div class="flex w-[24.25rem] md2:w-full justify-between items-center">
          <q-item-section>
            <span class="text-neutral-60 text-paragraph-2">Vendedor</span>
            <p class="text-headline-2">
              {{ accordion?.vendedor?.nome_completo }}
            </p>
          </q-item-section>
          <q-item-section class="text-right">
            <span class="text-neutral-60 text-paragraph-2">A receber</span>
            <p class="text-headline-2">
              {{ GLOBAL.currencyBR(Number(total).toFixed(2)) }}
            </p>
          </q-item-section>
        </div>
        <!-- Lateral direita -->
        <div class="flex items-center gap-16 md2:justify-end md2:self-end">
          <!-- <o-check size="md" v-model="check"></o-check> -->
          <q-icon
            v-if="!accordion.state"
            :data-id="accordion.id"
            class="icon-show-hidden"
            size="1.5rem"
            name="svguse:/icons.svg#icon_add_circle"
          ></q-icon>
          <q-icon
            v-else
            :data-id="accordion?.vendedor?.id"
            class="icon-show-hidden"
            size="1.5rem"
            name="svguse:/icons.svg#icon_subtract_circle"
          ></q-icon>
        </div>
      </div>
    </template>

    <q-card class="px-16 my-16">
      <o-table
        :rows="rowsExp(lancamentosAPagar)"
        :columns="columns"
        class="sticky-header-table table-accordion"
        row-key="name"
        secondary
        separator="cell"
      >
        <template v-slot:body="props">
          <q-tr :props="props" class="">
            <q-td key="id" :props="props">
              <div class="flex gap-8 items-center">
                <div class="flex flex-col">
                  <p class="text-paragraph-2">
                    {{ props.row.id }} - {{ props.row.nome_cliente }}
                  </p>
                  <p
                    class="text-paragraph-3 text-neutral-70 dark:text-white/50"
                  >
                    Colaborador
                  </p>
                </div>
              </div>
            </q-td>
            <q-td key="dataVencimento" :props="props">
              {{ props.row.dataVencimento }}
            </q-td>
            <q-td key="cobrado" :props="props">
              {{ props.row.cobrado }}
            </q-td>
            <q-td key="valor" :props="props">
              {{ GLOBAL.currencyBR(props.row.valor) }}
            </q-td>

            <q-td
              key="edit"
              :props="props"
              @click="navigatePageEdit(props.row.venda)"
              class="cursor-pointer"
            >
              <q-icon
                class="w-full min-w-[1.5rem]"
                size="24px"
                name="svguse:/icons.svg#icon_edit"
              ></q-icon>
            </q-td>
          </q-tr>
        </template>
      </o-table>
    </q-card>
  </o-accordion>
</template>

<script setup>
import { columns, rows as rowsExp } from 'src/pages/Home/ContasReceber/data'
import OAccordion from 'src/components/Accordion/OAccordion.vue'
import OCheck from 'src/components/Checkbox/OCheck.vue'
import OTable from 'src/components/Table/OTable.vue'
import gsap from 'gsap/dist/gsap'
import { computed, ref, watch } from 'vue'
import GLOBAL from 'src/utils/GLOBAL'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  accordion: Object,
  lancamentos: {
    type: Array,
    default: () => [],
  },
})

const accordionObj = ref('')

watch(
  () => props.accordion,
  (v) => {
    accordionObj.value = {
      state: false,
      ...v,
      lancamentos: props.lancamentos,
    }
  }
)
const rows = ref()

const total = computed(() => {
  return props.lancamentos?.reduce((ac, currValue) => {
    ac = Number(ac) + Number(currValue.valor_total)
    return ac
  }, 0)
})

const check = ref(false)

const navigatePageEdit = (id) => {
  router.push({
    name: 'editar-venda',
    params: { id },
  })
}

const animateIcon = (id) => {
  gsap.set(`.icon-show-hidden[data-id="${id}"]`, {
    opacity: 1,
    rotate: 0,
  })

  gsap.to(`.icon-show-hidden[data-id="${id}"]`, {
    opacity: 0.5,
    rotate: 360,
    ease: 'power1.out',
  })
}

const handleShow = (el) => {
  const id = el.id
  animateIcon(id)
  setTimeout(() => {
    if (accordionObj.value.id === id) {
      accordionObj.value = { ...accordionObj.value, state: true }
    }
  }, 300)
}

const handleHidden = (el) => {
  const id = el.id
  animateIcon(id)
  setTimeout(() => {
    if (accordionObj.value.id === id) {
      accordionObj.value = { ...accordionObj.value, state: false }
    }
  }, 300)
}

const lancamentosAPagar = computed(() => {
  return props.accordion.lancamentos?.filter((lancamento) => {
    return lancamento.data_pagamento === null
  })
})
</script>

<style lang="sass">
.accordion-contas-receber
  .q-table
      tr th
        border-bottom: 1px solid rgba(var(--neutral-30))
</style>
