/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

console.info('Enter client-entry.js')

import { createApp } from 'vue'

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'
import 'src/css/app.scss'

import singleSpaVue from 'single-spa-vue'
import packageInfo from 'app/package.json'
import { h } from 'vue'
import App from 'src/App'
import { Quasar } from 'quasar'

import createQuasarApp from '/.quasar/app.js'
import quasarUserOptions from '/.quasar/quasar-user-options.js'

const publicPath = `/`

async function start ({
  app,
  router,
  store,
  storeKey
}, bootFiles) {

  let hasRedirected = false
  const getRedirectUrl = url => {
    try {
      return router.resolve(url).href
    } catch (err) {
    }

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
    } catch (err) {
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

  app.use(router)
  app.use(store, storeKey)

  app.mount('#q-app')

}

let routerInstance
let storeInstance
let storeKeyInstance

createQuasarApp(createApp, quasarUserOptions)

  .then(app => {  // todo 问题就在于这里慢了
    debugger
    console.info('Enter function: extract router instance')

    routerInstance = app.router
    storeInstance = app.store
    // storeKeyInstance = app.storeKey
    debugger

    return Promise.all([

      import(/* webpackMode: "eager" */ 'boot/i18n'),

      import(/* webpackMode: "eager" */ 'boot/axios')

    ]).then(bootFiles => {

      console.info('Enter function: loading boots')

      const boot = bootFiles
        .map(entry => entry.default)
        .filter(entry => typeof entry === 'function')

      start(app, boot)
    })
  })

/* get lifecycle functions using single-spa-vue */
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render () {
      console.info(packageInfo.name + ' Start rendering')
      return h(App)
    }
  },
  handleInstance (app) {
    console.info('in handleInstance')
    app.use(Quasar, quasarUserOptions) // 来自app.js
    // app.use(appInstance)
    app.use(routerInstance)
    app.use(storeInstance, storeKeyInstance)
  }
})

console.info(packageInfo.name + ' Running Single-Spa Application: Quasar')

export const {
  bootstrap,
  mount,
  unmount,
  update
} = vueLifecycles

// single-spa application public interface, share with other apps. Communications between apps happen here.
export { getCount } from 'layouts/MainLayout.vue'
export { count as countRef } from 'layouts/MainLayout.vue'
