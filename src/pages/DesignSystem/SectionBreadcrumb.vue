<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Breadcrumbs</h1>

        <o-button
          secondary
          type="a"
          href="https://quasar.dev/vue-components/breadcrumbs#introduction"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </o-button>
      </div>

      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>
    </section>
  </q-card>
</template>

<script setup>
import oButton from 'src/components/Button/OButton.vue'
import OCheck from 'src/components/Checkbox/OCheck.vue'
import SectionAccordion from './SectionAccordion.vue'
</script>

<style lang="sass"></style>
