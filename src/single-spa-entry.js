/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { h, createApp } from 'vue'
import singleSpaVue from 'single-spa-vue'
import { Quasar } from 'quasar'

import App from './App.vue'
import packageInfo from '../package.json'
// import quasarConfInfo from '../quasar.conf'

import createQuasarApp from '../.quasar/app.js'
import quasarUserOptions from '../.quasar/quasar-user-options'

console.info('@cnic/main Entering Entry!')

// const bootModules = ['i18n', 'axios']

/* subtracted from .quasar/client-entry.js
* which is the very specific file called to initiate a quasar instance
* current version is working with v2.5.5
* need to update accordingly if upgrading quasar */

// console.info(packageInfo.name + ' Initiating Single-Spa Application: Quasar')

// as per https://single-spa.js.org/docs/ecosystem-vue#usage
const publicPath = packageInfo.name

async function start ({
  app,
  router,
  store
  // storeKey
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
      console.error(packageInfo.name + ' Quasar boot error: ', err)
      return
    }
  }
  // if (hasRedirected === true) {
  //    return
  // }
  // app.use(router)
  // app.use(store, storeKey)
  // app.mount('#q-app')
}

/* create our own quasar instance, meanwhile get the router and store instances */
let routerInstance
let storeInstance
let storeKeyInstance
createQuasarApp(createApp, quasarUserOptions).then(app => {
  // appInstance = app.app
  routerInstance = app.router
  storeInstance = app.store
  storeKeyInstance = app.storeKey
  /* modify next array if adding new boot modules */
  return Promise.all(
    [
      import(/* webpackMode: "eager" */ 'boot/i18n'),
      import(/* webpackMode: "eager" */ 'boot/axios')
    ]
    // bootModules.map(moduleName => `boot/${moduleName}`).map(modulePath => import(/* webpackMode: "eager" */ modulePath))
  ).then(/* async */ (bootFiles) => {
    const boot = bootFiles
      .map(entry => entry.default)
      .filter(entry => typeof entry === 'function')
    start(app, boot)
  })
})
/* subtracted from .quasar/client-entry.js */

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
    app.use(Quasar, quasarUserOptions) // todo 来自app.js
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
