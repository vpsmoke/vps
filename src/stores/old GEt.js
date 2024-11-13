// import { defineStore } from 'pinia'
// import { onMounted, watch, ref } from 'vue'
// import { api } from 'src/boot/axios'
// import { useAxios } from '@vueuse/integrations/useAxios'
// // import GLOBAL from 'src/utils/GLOBAL'

// const { URLS } = api.defaults

// export const useGetStore = defineStore('getStore', () => {
//   const isLoading = ref(false)
//   const clientes = ref(null)
//   const projetos = ref(null)
//   const subProjetos = ref(null)
//   const usuarios = ref(null)

//   async function getClientes() {
//     isLoading.value = true
//     const { data, error } = await useAxios(
//       URLS.cliente + '?no_loading',
//       { method: 'GET' },
//       api
//     )
//     try {
//       clientes.value = data.value
//       return data.value
//     } catch (e) {
//       return error
//     } finally {
//       isLoading.value = false
//     }
//   }

//   async function getProjetos() {
//     isLoading.value = true

//     const { data, error } = await useAxios(
//       URLS.projeto + '?no_loading',
//       { method: 'GET' },
//       api
//     )

//     try {
//       projetos.value = data.value
//       return data.value
//     } catch (e) {
//       return error
//     } finally {
//       isLoading.value = false
//     }
//   }

//   async function getSubProjetos() {
//     isLoading.value = true

//     const { data, error } = await useAxios(
//       URLS.subprojeto + '?no_loading',
//       { method: 'GET' },
//       api
//     )
//     try {
//       subProjetos.value = data.value
//       return data.value
//     } catch (e) {
//       return error
//     } finally {
//       isLoading.value = false
//     }
//   }

//   async function getUsuarios() {
//     isLoading.value = true

//     const { data, error } = await useAxios(
//       URLS.usuario + '?no_loading',
//       { method: 'GET' },
//       api
//     )

//     try {
//       usuarios.value = data.value
//       return data.value
//     } catch (e) {
//       return error
//     } finally {
//       isLoading.value = false
//     }
//   }

//   return {
//     getClientes,
//     getProjetos,
//     getSubProjetos,
//     getUsuarios,
//     isLoading,
//     clientes,
//     projetos,
//     subProjetos,
//     usuarios,
//   }
// })
