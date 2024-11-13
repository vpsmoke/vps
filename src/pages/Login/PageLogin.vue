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
        @submit="onSubmit"
        class="mx-auto my-auto flex justify-center form-login md:right-0 md:w-[95vw]"
      >
        <q-card class="!p-32 max-w-[26.75rem] flex flex-col">
          <h3 class="text-title-2 text-primary-pure">Fazer login</h3>

          <p
            class="mt-8 text-paragraph-1 text-neutral-70 mb-48 dark:text-white/60"
          >
            Seja bem-vindo(a)! Insira seu e-mail e senha para entrar em sua
            conta.
          </p>
          <OInput
            v-model="data.login"
            :rules="[(val) => !!val || 'Campo Obrigatorio']"
            size="lg"
            label="Email"
            ref="login"
          ></OInput>

          <OInput
            v-model="data.senha"
            :rules="[(val) => !!val || 'Campo Obrigatorio']"
            size="lg"
            label="Senha"
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
          <a
            href="#"
            class="text-paragraph-3 mt-4 hover:underline text-neutral-60 dark:text-white/60"
            @click="formType = 'forgot_password'"
          >
            Esqueceu sua senha?
          </a>
          <OCheck
            size="md"
            v-model="permanecerConectado"
            label="Permanecer conectado"
            class="mt-24 !text-neutral-60 dark:text-white/60"
            style="--neutral-100: var(--neutral-60)"
          ></OCheck>
          <OButton
            :loading="load"
            size="lg"
            type="submit"
            primary
            class="w-full mt-40 text-white text-paragraph-1"
            >Entrar na conta
          </OButton>
        </q-card>
      </q-form>

      <!-- Form Forgot password -->
      <q-form
        v-if="formType == 'forgot_password'"
        ref="form"
        class="mx-auto my-auto flex justify-center form-login md:w-[95vw]"
      >
        <q-card class="!p-32 max-w-[26.75rem] flex flex-col">
          <h3 class="text-title-2 text-primary-pure">Esqueci minha senha</h3>
          <p
            class="mt-8 text-paragraph-1 text-neutral-70 mb-48 dark:text-white/60"
          >
            Preencha o campo abaixo que enviaremos uma nova senha para o seu
            e-mail.
          </p>
          <OInput
            :rules="[(val) => !!val || 'Campo Obrigatorio']"
            size="lg"
            label="Email"
            ref="login"
            v-model="emailRecipient"
            class="pb-0"
          ></OInput>
          <div class="flex flex-col gap-4">
            <OButton
              :loading="load"
              size="lg"
              type="submit"
              primary
              :disabled="!emailRecipient || load"
              class="w-full mt-40 text-white text-paragraph-1"
              @click.prevent="sendEmailResetPassword"
              >Redefinir senha
            </OButton>
            <OButton
              size="lg"
              @click="formType = 'login'"
              tertiary
              type="submit"
              class="w-full text-paragraph-1"
              >Voltar ao login
            </OButton>
          </div>
        </q-card>
      </q-form>

      <!-- Form Message send -->
      <q-form
        v-if="formType == 'message_send'"
        ref="form"
        class="mx-auto my-auto flex justify-center form-login md:w-[95vw]"
      >
        <q-card class="!p-32 max-w-[26.75rem] flex flex-col">
          <h3 class="text-title-2 text-primary-pure">E-mail enviado!</h3>
          <p
            class="mt-8 text-paragraph-1 text-neutral-70 mb-48 dark:text-white/60"
          >
            Verifique seu e-mail e redefina sua senha.
          </p>

          <OButton
            :loading="load"
            size="lg"
            type="submit"
            primary
            class="w-full text-white text-paragraph-1"
            @click="formType = 'login'"
            >Fazer login
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

import OCheck from 'src/components/Checkbox/OCheck.vue'
import gsap from 'gsap/dist/gsap'
import imageLogin from 'src/assets/image/bg-dre.png'
import logoImage from 'src/assets/image/logoLogin.png'

import { useDarkMode } from 'src/stores/darkMode'
import { useUserStore } from 'src/stores/usuarios/user.store'
import { api } from 'src/boot/axios'
import axios from 'axios'

const { getUser } = useUserStore()

const dark = useDarkMode()
const form = ref(null)
const type = ref('password')
const formType = ref('login')
const login = ref(null)
const router = useRouter()
const load = ref(false)
const permanecerConectado = ref(true)
const dev = process.env.development
const emailRecipient = ref('')
const data = ref({
  login: dev ? 'edsondelimajunior' : '',
  senha: dev ? 'analiaedson10' : '',
})

watch(formType, async () => {
  await nextTick()
  data.value = {
    login: '',
    senha: '',
  }
  emailRecipient.value = ''
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

async function sendEmailResetPassword() {
  load.value = true
  await axios
    .post('https://vps.dokku.outboxsistemas.com/api/v1/users/reset_password/', {
      email: emailRecipient.value,
    })
    .then((response) => {
      formType.value = 'message_send'
    })
    .finally(() => {
      load.value = false
    })
}

async function onSubmit() {
  load.value = true
  const authStore = useAuthStore()
  const logged = await authStore.login(data.value.login, data.value.senha)
  console.log('usuarioooo', logged)
  if (logged) {
    router.push({ path: '/' })
    getUser()
  }
  load.value = false
}
</script>

<style lang="sass"></style>
