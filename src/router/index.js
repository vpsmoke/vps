import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes, { routes as routesFull } from './routes'
import { useAuthStore } from 'src/stores/auth.store'
import { Notify, useMeta } from 'quasar'
import { nextTick } from 'vue'

import { useUserStore } from 'src/stores/usuarios/user.store'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { api } from 'src/boot/axios'
import { useAxios } from '@vueuse/integrations/useAxios'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath

    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // FOR AUTH
  Router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const auth = useAuthStore()
    const publicPages = ['/login']
    const paginasObrigatorias = to.path.includes('/password/reset/confirm/') ? false : !publicPages.includes(to.path)
    const haveRefresh = auth.user.refresh
    const haveToken = auth.user.access
    if (paginasObrigatorias && !haveRefresh && !haveToken) {
      next({ path: '/login' })
    } else if (to.fullPath === '/login' && haveRefresh) {
      next({ path: '/' })
    } else {
      const { URLS } = api.defaults
      const { data, error } = await useAxios(
        URLS.user + '?no_loading',
        { method: 'GET' },
        api
      )
      const permissions = data.value?.permissions_by_user;
      const forRoutes = (routes) => {
        const paths = routes.map(route => {
          if (route.children) {
            return forRoutes(route.children);
          }
          return { path: route.path, access: route.access || '', name: route?.meta?.title || '' }
        })
        return paths
      }
      const pathsAndAccess = forRoutes(routesFull).flat();
      const currentPath = pathsAndAccess.find(obj => obj.path === to.fullPath);

      if (currentPath?.access) {
        const hasPermission = permissions.some(permission => currentPath.access.some(access => access === permission))
        if (hasPermission) {
          next();
        } else {
          Notify.create({
            type: 'negative',
            icon: '',
            iconColor: '#fff',
            message: `Você não tem permissão para acessar a página ${currentPath.name}`,
            position: 'top',
            timeout: 2500,
            html: true,
          })
          next({ path: '/' })
        }
      } else {
        next()
      }

    }
  })

  const DEFAULT_TITLE = 'Some Default Title';
  Router.afterEach(async (to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    await nextTick()
    // document.title = to.meta.title || DEFAULT_TITLE;

    const metaData = {
      // sets document title
      title: 'VPS',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: title => `${title} - ${to.meta.title}`,
    }

    useMeta(metaData)

  });

  return Router
})
