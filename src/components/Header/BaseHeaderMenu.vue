<template>
  <q-menu class="overflow-x-hidden w-[250px]" padding>
    <!-- <p class="px-16 pt-10 text-paragraph-2 text-start opacity-70 pb-8">
      Seja Bem Vindo <span class="capitalize">{{ user.first_name }}</span>
    </p> -->

    <q-separator />
    <q-list class="select-none min-w-[200px]">
      <!-- <q-item tag="label" class="flex items-center flex-row">
        <q-item-section>
          <p class="text-paragraph-2">Modo escuro</p>
        </q-item-section>

        <q-item-section>
          <q-space />
          <q-toggle size="sm" class="ml-auto" v-model="darkMode"></q-toggle>
        </q-item-section>
      </q-item>

      <q-separator></q-separator> -->

      <q-item
        tag="label"
        class="flex items-center flex-row hover:text-alert-error"
        ripple
        @click="logout"
      >
        <q-item-section>
          <p class="text-paragraph-2">Sair</p>
        </q-item-section>
        <q-item-section avatar class="">
          <q-icon name="logout"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDarkMode } from 'src/stores/darkMode'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
// import OInput from 'src/components/Input/OInput.vue'

// const user = inject('user')
const auth = useAuthStore()

const dark = useDarkMode()

const { darkMode } = storeToRefs(dark)
const router = useRouter()
async function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style lang="sass" scoped></style>
