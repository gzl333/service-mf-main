/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { h, createApp } from 'vue'
import createQuasarApp from '../.quasar/app.js'
import singleSpaVue from 'single-spa-vue'
import { Quasar } from 'quasar'
import quasarUserOptions from '../.quasar/quasar-user-options'
import App from './App.vue'
import { start } from 'src/quasar-client-entry'

let routerInstance

// // 又创建一次router，只为了拿到router实例
// void createQuasarApp(createApp, quasarUserOptions).then(({ router }) => {
//   console.log('created router')
//   routerInstance = router
// })

// todo：1.把start引入 2.把.quasar里面的createQuasarApp调用全部删掉

void createQuasarApp(createApp, quasarUserOptions).then((app) => {
  routerInstance = app.router
  return Promise.all([
    import(/* webpackMode: "eager" */ 'boot/i18n'),
    import(/* webpackMode: "eager" */ 'boot/axios')
  ]).then(async (bootFiles) => {
    const boot = bootFiles
      .map(entry => entry.default)
      .filter(entry => typeof entry === 'function')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await start(app, boot)
  })
})

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render () {
      return h(App)
    }
  },
  handleInstance (app) {
    app.use(Quasar, quasarUserOptions)
    app.use(routerInstance)
  },
  replaceMode: true
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
export const update = vueLifecycles.update
