<template>
  <q-layout class="grid place-items-center">
    <div class="grid grid-cols-2 h-screen w-screen md:flex">
      <div
        class="img-wrapper relative md:static overflow-hidden flex justify-center"
      >
        <q-img
          class="w-full h-full md:right-0 object-cover z-0 md:absolute"
          :src="imageLogin"
        />
        <h1
          class="text-display !font-bold md:hidden text-white absolute top-0 flex items-center justify-center w-full h-full"
        >
          <q-img
            class="w-[200px] md:absolute md:top-24 md:left-0 md:right-0 mx-auto"
            :src="logoImage"
          />
        </h1>
      </div>
      <!-- 
          Form login
         -->
      <q-form
        v-if="formType == 'login'"
        ref="form"
        class="mx-auto my-auto flex justify-center form-login md:right-0 md:w-[95vw]"
      >
        <q-card
          class="!p-32 max-w-[26.75rem] flex flex-col w-[350px] md:w-auto"
        >
          <h3 class="text-title-2 text-primary-pure mb-24">Redefinir senha</h3>

          <OInput
            v-model="data.password"
            :rules="[
              (val) => {
                if (!val) {
                  return 'Campo Obrigatorio'
                }
                if (val.length < 8) {
                  return 'A senha precisa de ao menos 8 caracteres'
                }
              },
            ]"
            size="lg"
            label="Senha"
            :type="typePassword"
            class="mt-24"
          >
            <template #append>
              <OButton
                class="!w-32 !h-32 !p-0 !min-h-0"
                size="sm"
                tertiary
                icon="visibility"
                @click="
                  typePassword === 'password'
                    ? (typePassword = 'text')
                    : (typePassword = 'password')
                "
              >
              </OButton>
            </template>
          </OInput>

          <OInput
            v-model="data.confirmPassword"
            :rules="[
              (val) => {
                if (!val) {
                  return 'Campo Obrigatorio'
                }
                if (val.length < 8) {
                  return 'A senha precisa de ao menos 8 caracteres'
                }
              },
            ]"
            size="lg"
            label="Confirme a Senha"
            :type="type"
            class="mt-24"
          >
            <template #append>
              <OButton
                class="!w-32 !h-32 !p-0 !min-h-0"
                size="sm"
                tertiary
                icon="visibility"
                @click="
                  type === 'password' ? (type = 'text') : (type = 'password')
                "
              >
              </OButton>
            </template>
          </OInput>

          <OButton
            :loading="load"
            size="lg"
            :disabled="
              data.password !== data.confirmPassword ||
              data.password.length < 8 ||
              load
            "
            primary
            @click="resetPassword"
            class="w-full mt-40 text-white text-paragraph-1"
            >Redefinir
          </OButton>
        </q-card>
      </q-form>
    </div>
  </q-layout>
</template>

<script setup>
import OButton from 'src/components/Button/OButton.vue'
import OInput from 'src/components/Input/OInput.vue'
import { useAuthStore } from 'src/stores/auth.store'
import { onMounted, ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap/dist/gsap'
import imageLogin from 'src/assets/image/bg-login.png'
import logoImage from 'src/assets/image/logoLogin.png'
import { useUserStore } from 'src/stores/usuarios/user.store'

import axios from 'axios'
import { Notify } from 'quasar'

const { getUser } = useUserStore()

const form = ref(null)
const type = ref('password')
const formType = ref('login')
const login = ref(null)
const router = useRouter()
const load = ref(false)
const permanecerConectado = ref(true)
const dev = process.env.development
const emailRecipient = ref('')
const typePassword = ref('password')
const data = ref({
  password: '',
  confirmPassword: '',
})

watch(formType, async () => {
  await nextTick()
  animationForm()
})

const animationForm = () => {
  gsap.set('.form-login', {
    opacity: 0,
    y: 90,
  })

  gsap.to('.form-login', {
    opacity: 1,
    y: 0,
    ease: 'power1.out',
  })

  gsap.to('.letras', {
    rotate: 360,
    repeat: -1,
    ease: 'none',
    duration: 20,
  })
}

onMounted(() => {
  form.value.focus()
  animationForm()
})

const { uid, token } = router?.currentRoute?.value.params
console.log('UID', uid, token)

async function resetPassword() {
  load.value = true
  await axios
    .post(
      'https://vps.dokku.outboxsistemas.com/api/v1/users/reset_password_confirm/',
      {
        uid,
        token,
        new_password: data.value.password,
        re_new_password: data.value.confirmPassword,
      }
    )
    .then((response) => {
      Notify.create({
        type: 'positive',
        icon: '',
        iconColor: '#fff',
        message: `Senha atualizada com sucesso :)`,
        position: 'top-right',
        timeout: 2500,
        html: true,
      })
      data.value.password = ''
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 1500)
    })
    .finally(() => {
      load.value = false
    })
}
</script>

<style lang="sass"></style>
