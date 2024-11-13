<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Inputs</h1>

        <OButton
          secondary
          type="a"
          href="https://quasar.dev/vue-components/input#introduction"
          target="_blank"
          >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </OButton>
      </div>

      <q-form ref="form">
        <div class="w-[16rem] flex gap-12">
          <o-input
            class="w-full border border-transparent"
            label="E-mail SM"
            size="sm"
            v-model="inputValue"
            placeholder="Email com multi validacoes"
            type="email"
            required
            name="email"
            :lazy-rules="true"
            :rules="[
              (val, rules) => rules.email(val) || 'Preencha um email valido',
              (val) =>
                val.length >= 25 || 'Por favor digite mais de 25 caracteres',
            ]"
          >
            <template #prepend>
              <q-icon name="mail_outline"></q-icon>
            </template>
          </o-input>

          <o-input
            class="w-full"
            label="Telefone MD"
            size="md"
            v-model="telValue"
            placeholder="Mascara + Validação"
            type="tel"
            mask="(##) #####-####"
            :lazy-rules="true"
            :rules="[
              (val) =>
                /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/.test(val) ||
                'Telefone Celular invalido',
            ]"
          >
          </o-input>
          <o-input
            class="w-full"
            label="Data"
            size="lg"
            v-model="dateValue"
            placeholder="Input Date LG"
            type="date"
            hint="Help text hint"
            mask="DD-MM-YYYY"
            append-size="32px"
          >
            <template v-slot:append>
              <OButton rounded>
                <q-icon name="calendar_today" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateValue" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <OButton
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </OButton>
            </template>
          </o-input>

          <o-input
            class="w-full"
            label="Nome Completo"
            size="lg"
            v-model="valueEx"
            type="text"
            name="name"
          >
            <template v-slot:prepend>
              <q-icon size="1.5rem" name="person"></q-icon>
            </template>
          </o-input>

          <o-input
            class="w-full"
            label="Textarea"
            size="lg"
            v-model="valueEx"
            type="textarea"
            name="name"
          >
          </o-input>

          <o-input
            class="w-full"
            label="Disable"
            size="lg"
            v-model="valueEx"
            type="text"
            name="name"
            disable
          >
          </o-input>

          <div class="flex gap-8">
            <OButton
              quarternary
              class="text-neutral-60"
              size="sm"
              icon-right="close"
              @click="form.resetValidation()"
              >Limpar validação</OButton
            >
            <OButton @click="form.submit()" secondary size="sm"
              >Enviar Form</OButton
            >
          </div>
        </div>
      </q-form>

      <syntax-highlight :code="code"></syntax-highlight>
    </section>
  </q-card>
</template>

<script setup>
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'
import OButton from 'src/components/Button/OButton.vue'

import { ref } from 'vue'
import OInput from 'src/components/Input/OInput.vue'

const inputValue = ref('')
const telValue = ref('')
const dateValue = ref('')
const valueEx = ref('')
const form = ref(null)
const code = `import OInput from "../../components/OInput.vue";

// Input -------------------
<o-input
  size="lg"
  label="Nome"
  v-model="valueEx"
  type="text"
  name="name" >
</o-input>
// size: sm, md, lg
// Label: Label do input
// type: text password text area email search tel file number url timedate textarea
// slots: https://quasar.dev/vue-components/input#introduction
// validation:  https://quasar.dev/vue-components/input#validation


// Patterns ja existentes para validação, 2* parametro
//https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js
`
</script>

<style lang="sass"></style>
import { ref } from 'vue'
