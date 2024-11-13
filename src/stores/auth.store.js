import { defineStore } from 'pinia'
import { api, axiosController } from 'src/boot/axios'
import { nextTick, ref, watch } from 'vue'
import { Cookies, Notify, LoadingBar } from 'quasar'

const tokenOpt = {
  secure: process.env.HTTPS_MODE,
  // expires: '30m 0',
  // path: '/',
}

const refreshTokenOpt = {
  secure: process.env.HTTPS_MODE,
  // expires: '30m 0',
}

export const useAuthStore = defineStore('auth', () => {
  const returnUrl = ref('/')
  const TOKEN = Cookies.get('NDT_TOKEN')
  const REFRESH_TOKEN = Cookies.get('NDT_REFRESH_TOKEN')

  const user = ref({
    access: TOKEN && TOKEN,
    refresh: REFRESH_TOKEN && REFRESH_TOKEN,
  })

  watch(
    () => user.value.access,
    () => {
      const TOKEN = user.value.access
      api.defaults.headers.Authorization = `Bearer ${TOKEN}`
      TOKEN && Cookies.set('NDT_TOKEN', TOKEN, tokenOpt)
    }
  )

  async function login(username, password) {
    try {
      const request = await api.post(`token/`, { password, username })
      user.value = request.data
      const TOKEN = user.value.access
      const REFRESH_TOKEN = user.value.refresh
      console.log('USER', user.value, request.data)
      REFRESH_TOKEN &&
        Cookies.set('NDT_REFRESH_TOKEN', REFRESH_TOKEN, refreshTokenOpt)
      TOKEN && Cookies.set('NDT_TOKEN', TOKEN, tokenOpt)

      return true
    } catch (e) {
      console.log(e)
      Notify.create({
        type: 'error',
        message: `Usuario ou senha invalidos`,
        position: 'top-right',
        timeout: 1000,
        html: true,
      })

      return false
    }
  }

  async function refreshToken() {
    try {
      console.warn('Tentando atualizar o TOKEN')
      const { data } = await api.post(`token/refresh/`, {
        refresh: user.value.refresh,
      })
      user.value.access = data.access

      console.warn('TOKEN Atualizado com sucesso')
      return user.value.access
    } catch (e) {
      console.error('Erro ao atualizar o TOKEN')
      logout()
    }
  }

  async function logout() {
    user.value = {}
    // axiosController.abort()
    LoadingBar.stop()
    Cookies.remove('NDT_REFRESH_TOKEN')
    Cookies.remove('NDT_TOKEN')
  }

  return { user, returnUrl, login, logout, refreshToken, TOKEN }
})

// api.interceptors.response.use(response => {
//     return response;
// }, (err: AxiosError) => {
//     if (err.response.status === 401) {
//         if (err.response.data?.code === 'token.expired') {
//             const { 'nextauth.refreshToken': refreshToken } = parseCookies(ctx);
//             const originalConfig = err.config;
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 api.post('/user/refresh', { refreshToken }).then(response => {
//                     const { refreshToken, token } = response.data;

//                     setCookie(ctx, 'nextauth.token', token, {
//                         // maxAge: 60 * 60 * 24 * 30, //30 days;
//                         maxAge: 60 * 60,
//                         path: '/'
//                     })

//                     setCookie(ctx, 'nextauth.refreshToken', refreshToken, {
//                         // maxAge: 60 * 60 * 24 * 30, // 1 month
//                         maxAge: 60 * 60,
//                         path: '/'
//                     })

//                     api.defaults.headers['Authorization'] = `Bearer ${token}`;

//                     failedRequestQueue.forEach(request => request.onSuccess(token));
//                     failedRequestQueue = [];
//                 }).catch(err => {
//                     failedRequestQueue.forEach(request => request.onFailed(err));
//                     failedRequestQueue = [];
//                     if (process.browser) {
//                         signOut();
//                     }
//                 }).finally(() => {
//                     isRefreshing = false;
//                 })
//             }

//             return new Promise((resolve, reject) => {
//                 failedRequestQueue.push({
//                     onSuccess: (token) => {
//                         originalConfig.headers['Authorization'] = `Bearer ${token}`
//                         resolve(api(originalConfig));
//                     },
//                     onFailed: (err) => {
//                         reject(err);
//                     }
//                 })
//             })

//         } else {
//
//             if (process.browser) {
//                 signOut();
//             } else {
//                 return Promise.reject(new AuthTokenError())
//             }
//         }
//     }

//     return Promise.reject(err);
// })
