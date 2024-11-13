<template>
  <q-card class="p-16 w-full">
    <div class="flex items center justify-between w-full mb-16">
      <h1 class="text-title-2">Checkbox & RadioButton</h1>
      <o-button
        secondary
        type="a"
        href=" https://quasar.dev/vue-components/checkbox"
        target="_blank"
        >QDocs
        <q-icon class="!text-20" name="arrow_outward"></q-icon>
      </o-button>
    </div>
    <div class="flex gap-4 flex-col">
      <p class="text-headline-1">Radio</p>
      <o-radio
        size="sm"
        v-model="value"
        val="oi"
        label="Radio Button"
      ></o-radio>
      <o-radio
        size="md"
        v-model="value"
        val="oi2"
        label="Disable"
        disable
      ></o-radio>
      <o-radio
        size="lg"
        v-model="value"
        val="oi3"
        label="Radio Button"
      ></o-radio>
    </div>

    <div class="flex gap-4 flex-col mt-16">
      <p class="text-headline-1">Check</p>
      <o-check size="sm" v-model="check" label="Check Button"></o-check>
      <o-check size="md" v-model="check" label="Disable" disable></o-check>
      <o-check size="lg" v-model="checkTrue" label="Check Button"></o-check>
    </div>

    <syntax-highlight :code="code"></syntax-highlight>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import ORadio from 'src/components/Radio/ORadio.vue'
import OCheck from 'src/components/Checkbox/OCheck.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'
import OButton from 'src/components/Button/OButton.vue'

const code = `<script>
import ORadio          from "../../components/ORadio.vue";
//size: sm, md, lg
<${'/'}script>

<template>
  <o-radio
    size="sm"
    val="3"
    v-model="value"
    label="Option 3"
  ></o-radio>

<o-check
  size="sm"
  v-model="check"
  label="Check Button">
</o-check>

</template>

`

const value = ref('radio')
const check = ref(false)
const checkTrue = ref(true)
</script>

<style lang="scss" scoped></style>
