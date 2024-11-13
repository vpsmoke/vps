<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Buttons</h1>

        <OButton
          secondary
          type="a"
          href="https://quasar.dev/vue-components/button#introduction"
          target="_blank"
          icon-right="svguse:/icons.svg#arrow_rounded_up"
          >QDocs
        </OButton>
      </div>

      <div>
        <p>Primary</p>
        <div class="flex gap-8">
          <OButton size="sm" primary>Button SM</OButton>
          <OButton size="md" primary>Button MD</OButton>
          <OButton size="lg" primary disable>Button LG</OButton>
          <OButton
            size="lg"
            primary
            icon-right="svguse:/icons.svg#arrow_rounded_up"
            >With Icon</OButton
          >
        </div>
      </div>

      <div>
        <p>Secondary</p>
        <div class="flex gap-8">
          <OButton size="sm" secondary>Secondary SM</OButton>
          <OButton size="sm" secondary loading>Button SM</OButton>
        </div>
      </div>

      <div>
        <p>Tertiary</p>
        <div class="flex gap-8">
          <OButton size="sm" tertiary>Tertiary SM</OButton>
          <OButton
            size="sm"
            tertiary
            :loading="progress.loading"
            @click="startComputing"
            :percentage="progress.percentage"
            >Click to Loading
          </OButton>
        </div>
      </div>
      <syntax-highlight :code="code"></syntax-highlight>

      <!--  <pre class="mt-32" v-highlightjs="codeBTN"><code class="vue"></code></pre> -->
    </section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'
import OButton from 'src/components/Button/OButton.vue'

const code = `<script>
import oButton from "src/components/OButton.vue";
//size: sm, md, lg
//variation: [primary] [secondary] [tertiary]
<${'/'}script>

<template>
  <OButton
    size="sm"
    primary
    >Button SM
  </OButton>
</template>

`
const progress = ref({ loading: false, percentage: 0 })

function startComputing(a, b) {
  progress.value.loading = true
  progress.value.percentage = 0

  setInterval(() => {
    progress.value.percentage += Math.floor(Math.random() * 8 + 10)
    if (progress.value.percentage >= 100) {
      progress.value.loading = false
    }
  }, 1200)
}
</script>

<style lang="sass"></style>
