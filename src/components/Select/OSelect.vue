<template>
  <q-select
    ref="componentRef"
    :class="'size-' + attrs.size"
    v-bind="attrs"
    :size="null"
    popup-content-class="select-menu"
    options-selected-class="option-selecionada"
    @filter="filterFn"
    :options="options"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
    <q-tooltip
      v-if="attrs.modelValue && attrs.options?.length"
      anchor="bottom left"
      self="bottom left"
      :offset="[0, 40]"
    >
      <p class="font-normal">
        {{
          attrs.options?.filter((i) => i.value === attrs.modelValue)[0].label
        }}
      </p>
    </q-tooltip>
  </q-select>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs, ref, onMounted, watch, onUpdated } from 'vue'
const emit = defineEmits(['inputSearch'])
const slots = useSlots()
const attrs = useAttrs()
const componentRef = ref(null)
const options = ref(attrs.options)

let stringOptions = attrs.options

// function filterFn(val, update) {
//   if (val === '') {
//     update(() => {
//       options.value = produtos.value
//     })
//     return
//   }

//   update(() => {
//     const needle = val.toLowerCase()
//     options.value = produtos.value.filter(
//       (v) => String(v.label).toLowerCase().indexOf(needle) > -1
//     )
//   })
// }

watch(
  () => attrs.options,
  (v) => {
    options.value = v
    stringOptions = v
  },
  {
    deep: true,
  }
)

defineExpose({ componentRef })

function filterFn(val, update, abort) {
  emit('inputSearch', val)
  update(() => {
    if (!val) return (options.value = stringOptions)
    const needle = val?.toLowerCase()
    options.value = stringOptions?.filter((v) => {
      const option = v.label
      const optionNormalized = option
        ?.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
      const have = optionNormalized.indexOf(needle) > -1
      return have
    })
  })
}
onUpdated(() => {
  // console.log('options.value', options.value)
  // console.log('string.options', stringOptions)
  // console.log('attrs.options', attrs.options)
})
</script>

<style lang="sass">

.q-select--multiple
  .q-field__native
    gap: 2px
    padding: 4px 2px 2px

.q-select--single
  .q-field__native
    flex-wrap: nowrap
    span
      flex: 0 3 auto
    input
      flex: 1
</style>
