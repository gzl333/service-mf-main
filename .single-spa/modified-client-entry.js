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


async function start ({ app, router }, bootFiles) {



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
createQuasarApp(createApp, quasarUserOptions)

  .then(app => {

    router = app.router

    return Promise.all([
      import(/* webpackMode: "eager" */ 'boot/pinia'),

      import(/* webpackMode: "eager" */ 'boot/axios')

    ]).then(bootFiles => {
      const boot = bootFiles
        .map(entry => entry.default)
        .filter(entry => typeof entry === 'function')

      start(app, boot)
    })
  })

// @mimas: i18n
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

// 获取浏览器locale, 因只提供英文和简体中文两种locale，只截取locale code的前两位
const browserLocale = Quasar.lang.getLocale()?.slice(0, 2)

const i18n = createI18n({
  locale: browserLocale === 'zh' ? 'zh' : 'en', // 置i18n模块的初始locale。不是中文的一律显示英文
  fallbackLocale: 'zh', // 找不到翻译的就落到中文，可以避免再为中文写一份翻译库
  globalInjection: true,
  messages
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
    app.use(i18n)
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
export { default as useMainStore } from 'src/store'
export { i18n }
