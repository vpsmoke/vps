<template>
  <q-card class="p-16 w-full">
    <section class="flex flex-col gap-8 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-title-2 mb-18">Modal</h1>

        <OButton
            secondary
            type="a"
            href="https://quasar.dev/quasar-plugins/dialog#introduction"
            target="_blank"
        >QDocs
          <q-icon class="!text-20" name="arrow_outward"></q-icon>
        </OButton>
      </div>
      <OButton primary type="a" @click="dialogRef.show()">Open</OButton>

      <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin p-32">
          <p>Modalzin</p>
          <q-card-actions align="right">
            <q-btn color="primary" label="OK" @click="onOKClick"/>
            <q-btn color="primary" label="Cancel" @click="onDialogCancel"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <syntax-highlight :code="code"></syntax-highlight>
    </section>
  </q-card>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import SyntaxHighlight from 'src/components/DesignSystem/SyntaxHighlight.vue'

import { useDialogPluginComponent } from 'quasar'

const props = defineProps({
  // ...your custom props
})

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}

const code = ``
</script>

<style lang="sass"></style>
