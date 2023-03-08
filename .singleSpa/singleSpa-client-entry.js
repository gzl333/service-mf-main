/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.config.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

/*
* @mimas
* this file is last edited on 2023/01/30
* adapted to the latest client-entry.js file
*  */


import { createApp } from 'vue'
// @mimas: !all css files MUST be included in root-config!






import '@quasar/extras/mdi-v5/mdi-v5.css'

import '@quasar/extras/line-awesome/line-awesome.css'

import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'




// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass' // @mimas: MUST include a cdn version in root-config




import 'src/css/app.scss' // @mimas: contains customized css variables, does not need to be included in root-config

// @mimas: /.quasar files
import createQuasarApp from './app.js'
import quasarUserOptions from './quasar-user-options.js'

// @mimas: single-spa needs
import singleSpaVue from 'single-spa-vue'
import { h } from 'vue'
import App from 'src/App'
import { Quasar } from 'quasar'
import packageInfo from 'app/package.json'

console.info(packageInfo.name + ' Running Single-Spa Application: Quasar')






const publicPath = `/`


async function start ({
  app,
  router
  , store
}, bootFiles) {



  let hasRedirected = false
  const getRedirectUrl = url => {
    try { return router.resolve(url).href }
    catch (err) {}

    return Object(url) === url
      ? null
      : url
  }
  const redirect = url => {
    hasRedirected = true

    if (typeof url === 'string' && /^https?:\/\//.test(url)) {
      window.location.href = url
      return
    }

    const href = getRedirectUrl(url)

    // continue if we didn't fail to resolve the url
    if (href !== null) {
      window.location.href = href

    }
  }

  const urlPath = window.location.href.replace(window.location.origin, '')

  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    try {
      await bootFiles[i]({
        app,
        router,
        store,
        ssrContext: null,
        redirect,
        urlPath,
        publicPath
      })
    }
    catch (err) {
      if (err && err.url) {
        redirect(err.url)
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (hasRedirected === true) {
    return
  }

  // @mimas: will inject router,store in single-spa-vue
  // app.use(router)







  // app.mount('#q-app')






}

// @mimas: grab the router instance during quasar initiation
let router

// @mimas: original
createQuasarApp(createApp, quasarUserOptions)

  .then(app => {
    router = app.router

    // eventually remove this when Cordova/Capacitor/Electron support becomes old
    const [ method, mapFn ] = Promise.allSettled !== void 0
      ? [
        'allSettled',
        bootFiles => bootFiles.map(result => {
          if (result.status === 'rejected') {
            console.error('[Quasar] boot error:', result.reason)
            return
          }
          return result.value.default
        })
      ]
      : [
        'all',
        bootFiles => bootFiles.map(entry => entry.default)
      ]

    return Promise[ method ]([

      import(/* webpackMode: "eager" */ 'boot/i18n'),

      import(/* webpackMode: "eager" */ 'boot/axios'),

      import(/* webpackMode: "eager" */ 'boot/reload')

    ]).then(bootFiles => {
      const boot = mapFn(bootFiles).filter(entry => typeof entry === 'function')
      start(app, boot)
    })
  })

// @mimas: single-spa-vue
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render () {
      return h(App)
    }
  },
  handleInstance (app) {
    // @mimas: inject quasar UI, router
    app.use(Quasar, quasarUserOptions)
    app.use(router)
    // @mimas: set application name as a global property
    app.config.globalProperties.$appName = packageInfo.name
  }
})

export const {
  bootstrap,
  mount,
  unmount,
  update
} = vueLifecycles

// @mimas: single-spa application public interface
// share with other apps. Communications between apps happen here.
export { useStore as useStoreMain } from 'stores/store'
