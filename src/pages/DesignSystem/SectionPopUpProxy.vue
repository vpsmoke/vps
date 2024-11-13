<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">PopUp Proxy</h1>

        <o-button
            secondary
            type="a"
            href="https://quasar.dev/vue-components/popup-proxy#introduction"
            target="_blank"
        >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </o-button>
      </div>

      <section>
        <o-button size="md" primary
        >Excluir
          <q-popup-proxy default class="popup-proxy">
            <div class="mb-16">
              <div class="flex items-center">
                <p class="text-headline-3 mb-4">Deseja realmente escluir ?</p>
              </div>
              <span class="text-paragraph-2 dark:text-opacity-70"
              >Essa ação não terá reversão.</span
              >
            </div>
            <div class="flex items-center gap-4">
              <o-button size="md" secondary>Cancelar</o-button>
              <o-button size="md" primary>Sim, Excluir</o-button>
            </div>
          </q-popup-proxy>
        </o-button>
      </section>

      <syntax-highlight :code="code"></syntax-highlight>
    </section>
  </q-card>
</template>

<!--suppress ES6UnusedImports -->
<script setup>
import OButton from 'src/components/Button/OButton.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'

const code = `
//Apenas um popupproxy default
//somente adicionar a classe e o atributo para pegar os estilos basicos
// .popup-proxy [default]
<script><${ '/' }script>
<o-button size="md" primary
  >Excluir
  <q-popup-proxy default class="popup-proxy">
    <div class="mb-16">
      <div class="flex items-center">
        <p class="text-headline-3 mb-4">
          Deseja realmente escluir ?
        </p>
      </div>
      <span class="text-paragraph-2 dark:text-opacity-70"
        >Essa ação não terá reversão.</span
      >
    </div>
    <div class="flex items-center gap-4">
      <o-button size="md" secondary>Cancelar</o-button>
      <o-button size="md" primary>Sim, Excluir</o-button>
    </div>
  </q-popup-proxy>
</o-button>

`
</script>

<style lang="sass"></style>
