/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers')
const path = require('path')
const dotenv = require('dotenv')


module.exports = configure(function (ctx) {
  const env = ctx.dev ? dotenv.config().parsed : process.env

  return {
    eslint: {
      fix: true,
      // include = [],
      // exclude = [],
      // rawOptions = {},
      warnings: true,
      errors: true,
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: ['i18n', 'axios', 'emitter', 'LoadingBar', 'apexCharts'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'material-symbols-rounded',
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      //  'roboto-font', // optional, you are not bound to it
      // 'material-icons-round' // optional, you are not bound to it
      // 'svg-mdi-v6'
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },
      showProgress: true,

      vueRouterMode: 'history', // available values: 'hash', 'history'
      rebuildCache: true, // rebuilds Vite/linter/etc cache on startup
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // publicPath: 'dist/spa',
      // analyze: true,
      env: {
        API_URL: env.API_URL,
        BACKEND_URL: env.BACKEND_URL,

        HTTPS_MODE: !ctx.dev,
        development: ctx.dev,
      },
      // rawDefine: {}
      // ignorePublicFolder: true,
      minify: false,
      // polyfillModulePreload: true,
      // distDir

      extendViteConf(viteConf) {
        console.log('⚡ Vamo q vamo')
        const empty = '../src/assets/empty.js'
        viteConf.resolve.alias['quasar/dist/quasar.sass'] = empty
        viteConf.resolve.alias['quasar/dist/quasar.css'] = empty
      },
      // viteVuePluginOptions: {},

      vitePlugins: [
        [
          '@intlify/vite-plugin-vue-i18n',
          {
            // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
            // compositionOnly: false,

            // you need to set i18n resource including paths !
            include: path.resolve(__dirname, './src/i18n/**'),
          },
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      vueDevtools: true,
      open: false, // opens browser window automatically,
      options: {
        usePolling: true,
      },
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {
        // loadingBar: {
        //   size: '4px',
        // },
        // dark: 'auto' // or Boolean true/false
      },

      // iconSet: 'material-icons', // Quasar icon set
      lang: 'pt-BR', // Quasar language pack
      ripple: {
        early: true,
      },
      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],
      // iconSet: 'material-symbols-rounded',
      // Quasar plugins
      plugins: ['Notify', 'Dialog', 'LoadingBar', 'Meta'],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: ['fadeIn', 'fadeOut'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    sourceFiles: {
      // rootComponent: 'src/App.vue',
      // router: 'src/router/index',
      // store: 'src/store/index',
      registerServiceWorker: 'src-pwa/register-service-worker',
      serviceWorker: 'src-pwa/custom-service-worker',
      pwaManifestFile: 'src-pwa/manifest.json',
      electronMain: 'src-electron/electron-main',
      electronPreload: 'src-electron/electron-preload'
    },

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: true,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,

      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'sw.js',
        // ...other Workbox options...
        exclude: [/\.map$/], // this fixed it.
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: false,
      appName: 'VPS',
      version: '0.1',
      description: 'VPS',
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: 'builder', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      // bundler: 'builder', // set here instead of using command line flag --bundler
      // builder: {
      //   appId: 'com.electron.myelectronapp',
      //   win: {
      //     target: 'nsis'
      //   },
      //   publish: {
      //     'provider': 's3',
      //     'bucket': 'myS3bucket'
      //   }
      // }

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'vps',
        win: {
          target: 'portable',
        },

        linux: {
          target: 'AppImage ',
        },
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ['my-content-script'],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  }
})
