<template>
  <div class="flex gap-8 items-center md:flex-col md:w-full">
    <OButton
      class="md2:w-full btnFilterGraphic md2:mt-8"
      size="md"
      secondary
    >
      <q-icon
        size="0.8rem"
        name="svguse:/icons.svg#icon_filter_option"
      ></q-icon>
      Filtrar

      <q-popup-proxy
        default
        breakpoint="280"
        class="popup-proxy w-[23.4375rem] flex flex-col flex-nowrap gap-16"
      >
        <o-select
          v-model="selYear"
          :options="optionsFilterMargem.years"
          emit-value
          map-options
          size="md"
          behavior="menu"
          label="Selecionar ano"
          clearable
        ></o-select>

        <div class="flex items-center justify-end gap-4 mt-8">
          <o-button size="md" secondary @click="closeFilter">Cancelar</o-button>
          <o-button size="md" primary @click="consultarDados">Consultar</o-button>
        </div>
      </q-popup-proxy>
    </OButton>

    <OButton
      @click="clearFilter"
      class="md2:w-full"
      size="md"
      secondary
    >
      Limpar filtro
    </OButton>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, shallowRef, computed } from 'vue'
import OButton from 'src/components/Button/OButton.vue'
import OSelect from 'src/components/Select/OSelect.vue'
import { Notify, QIcon, QPopupProxy } from 'quasar'

const props = defineProps({
  optionsFilterMargem: {
    type: Object,
    required: true
  },
  selectedYear: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:selectedYear'])
const currentYear = new Date().getFullYear()
const selYear = ref(currentYear)

const clearFilter = () => {
  selYear.value = null
}

const closeFilter = () => {
  // Implement logic to close the filter
}

const consultarDados = () => {
  emit('update:selectedYear', selYear.value)
}

onMounted(() => {
  selYear.value = props.selectedYear
})
</script>