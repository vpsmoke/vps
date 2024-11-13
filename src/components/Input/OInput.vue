<template>
  <q-input
    class="o-input"
    :class="'size-' + attrs.size"
    v-bind="attrs"
    :size="null"
    ref="componentRef"
  >
    <template v-for="slot in Object.keys(slots)" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </q-input>
</template>

<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useSlots, useAttrs, ref, watch } from 'vue'
const componentRef = ref(null)

const slots = useSlots()
const attrs = useAttrs()
const appendSize = attrs['append-size']
const appendsize = attrs['append-size'] ? attrs['append-size'] : '35px'
const prependsize = attrs['prepend-size'] ? attrs['prepend-size'] : '20px'

defineExpose({ componentRef })
</script>

<style lang="sass">
.o-input
  --prepend-size: v-bind(prependsize)
  --append-size: v-bind(appendsize)
  .q-field__append
      width: v-bind(appendSize) !important

  .q-field__prepend
    width: v-bind(prependsize) !important
//remove browser autocomplete background
.body--dark
  .o-input
    input:-webkit-autofill
        -webkit-box-shadow: 0 0 0px 100px rgb(var(--d-neutral-30)) inset
        -webkit-text-fill-color: rgba(var(--white), 0.9) !important

    input:-webkit-autofill:focus
      -webkit-box-shadow: 0 0 0 100px rgb(var(--d-neutral-30)) inset
      -webkit-text-fill-color: rgba(var(--white), 0.9) !important

.body--light
  .o-input
    input:-webkit-autofill
        -webkit-box-shadow: 0 0 0px 500px rgb(var(--white)) inset
        -webkit-text-fill-color: rgba(var(--neutral-70), 1) !important

    input:-webkit-autofill:focus
      -webkit-box-shadow: 0 0 0 50px rgb(var(--white)) inset
      -webkit-text-fill-color: rgba(var(--neutral-70), 1) !important
</style>
