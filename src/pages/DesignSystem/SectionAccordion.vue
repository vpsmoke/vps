<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Accordion</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/expansion-item#introduction"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </o-button>
      </div>

      <section>
        <o-accordion
          class="border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden"
        >
          <template v-slot:header>
            <q-item-section avatar class="w-32">
              <q-icon name="tips_and_updates" />
            </q-item-section>

            <q-item-section> Titulo do accordion </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </o-accordion>
      </section>

      <syntax-highlight :code="code"></syntax-highlight>
    </section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import oButton from 'src/components/Button/OButton.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'
import OAccordion from 'src/components/Accordion/OAccordion.vue'

const code = `<script>
import OAccordion from 'src/components/OAccordion.vue'
<${'/'}script>
//o  accordion usa o component QExpansionItem por tras
//portanto tem os mesmo metodos e props
//estilizo pelo tailwind para ter uma liberdade maior de customisação
//e nao deixar engessado


<o-accordion class="border border-neutral-100/10 rounded-[3px] dark:border-white/10 overflow-hidden">
  <template v-slot:header>
    <q-item-section avatar class="w-32">
      <q-icon name="tips_and_updates" />
    </q-item-section>

    <q-item-section> Titulo do accordion </q-item-section>
  </template>

  <q-card>
    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipisicing
      elit. Quidem, eius reprehenderit eos corrupti commodi
      magni quaerat ex numquam, dolorum officiis modi facere
      maiores architecto suscipit iste eveniet doloribus ullam
      aliquid.
    </q-card-section>
  </q-card>
</o-accordion>`
</script>

<style lang="sass"></style>
