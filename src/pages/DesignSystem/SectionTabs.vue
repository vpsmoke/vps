<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Tabs</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/input#introduction"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </o-button>
      </div>

      <section class="flex gap-12 flex-col justify-start">
        <q-tabs
          v-model="tab"
          class="text-neutral-100 dark:text-white/90 text-paragraph-1 w-max"
        >
          <q-tab name="mails">
            <template class="inline-flex flex-row items-center gap-4">
              <q-icon size="1.25rem" name="add_circle_outline"></q-icon>
              <p>Mails</p>
              <q-icon size="1.25rem" name="add_circle_outline"></q-icon>
            </template>
          </q-tab>
          <q-tab name="alarms" label="Alarms"></q-tab>
          <q-tab name="movies" label="Movies"></q-tab>
        </q-tabs>

        <q-tabs
          v-model="tab"
          class="text-neutral-100 dark:text-white/90 text-paragraph-1 w-max"
          dense
          active-color="primary-pure"
        >
          <q-tab name="mails">
            <template class="inline-flex flex-row items-center gap-4">
              <q-icon size="1.25rem" name="add_circle_outline"></q-icon>
              <p>Dense</p>
              <q-icon size="1.25rem" name="add_circle_outline"></q-icon>
            </template>
          </q-tab>
          <q-tab name="alarms" label="Alarms"></q-tab>
          <q-tab name="movies" label="Movies"></q-tab>
        </q-tabs>

        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </section>

      <syntax-highlight :code="code"></syntax-highlight>
    </section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import oButton from 'src/components/Button/OButton.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'

const code = `<script><${'/'}script>
<div>
<q-tabs
  v-model="tab"
  class="text-neutral-100 dark:text-white/90 text-paragraph-1 w-max"
  dense
  active-color="primary-pure"
>
  <q-tab name="mails">
    <template class="inline-flex flex-row items-center gap-4">
      <q-icon
        size="1.25rem"
        name="add_circle_outline"
      ></q-icon>
      <p>Dense</p>
      <q-icon
        size="1.25rem"
        name="add_circle_outline"
      ></q-icon>
    </template>
  </q-tab>
  <q-tab name="alarms" label="Alarms"></q-tab>
  <q-tab name="movies" label="Movies"></q-tab>
</q-tabs>  
</div>


//Para conectar ao route consulte https://quasar.dev/vue-components/tabs#connecting-to-vue-router
// as tabs nao tem wrapper são o proprio component do quasar
// as tabs nao usam size, o default é 48 e dense o  32
// active-color: é possivel usar as variaveis te cor do projeto
// porem tem que colocar no safelist do tailwind
`
const tab = ref('mails')
</script>

<style lang="sass"></style>
