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

import { createApp } from 'vue'
// @mimas: !all css files need to be included in root-config!
import '@quasar/extras/roboto-font/roboto-font.css' // include a cdn version in root-config
import '@quasar/extras/material-icons/material-icons.css' // include a cdn version in root-config
// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'  // include a cdn version in root-config
import 'src/css/app.scss'  // contains customed css variables, need to include in root-config

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

  // @mimas: original
  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    try {
      await bootFiles[i]({
        app,
        router,

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

  // @mimas: make each boot file is awaited during booting!
  // for await (let boot of bootFiles) {
  //   if (hasRedirected === false) {
  //     try {
  //       await boot({
  //         app,
  //         router,
  //
  //         ssrContext: null,
  //         redirect,
  //         urlPath,
  //         publicPath
  //       })
  //     } catch (err) {
  //       if (err && err.url) {
  //         redirect(err.url)
  //         return
  //       }
  //
  //       console.error('[Quasar] boot error:', err)
  //       return
  //     }
  //   }
  // }

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

    return Promise.all([
      import(/* webpackMode: "eager" */ 'boot/pinia'),

      import(/* webpackMode: "eager" */ 'boot/i18n'),

      import(/* webpackMode: "eager" */ 'boot/axios'),

      import(/* webpackMode: "eager" */ 'boot/reload'),

    ]).then(bootFiles => {
      const boot = bootFiles
        .map(entry => entry.default)
        .filter(entry => typeof entry === 'function')

      start(app, boot)
    })
  })

// @mimas: await each step
// (async () => {
//   const app = await createQuasarApp(createApp, quasarUserOptions)
//   const bootFiles = await Promise.all([
//     import(/* webpackMode: "eager" */ 'boot/pinia'),
//     import(/* webpackMode: "eager" */ 'boot/i18n'),
//     import(/* webpackMode: "eager" */ 'boot/axios'),
//     import(/* webpackMode: "eager" */ 'boot/reload'),
//   ])
//   const boot = bootFiles.map(entry => entry.default).filter(entry => typeof entry === 'function')
//   start(app, boot)
//   router = app.router
// })()

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
export { default as useStoreMain } from 'src/store'
