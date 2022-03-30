import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { Quasar } from 'quasar'
import messages from 'src/i18n'

// extend the global Window type with 'i18n'
declare global {
  interface Window {
    i18n: string;
  }
}

// 获取浏览器locale, 因只提供英文和简体中文两种locale，只截取locale code的前两位
const browserLocale = Quasar.lang.getLocale()?.slice(0, 2)

// 导出i18n实例供全局使用，singleSpa中避免使用useI18n方式
export const i18n = createI18n({
  locale: browserLocale === 'zh' ? 'zh' : 'en', // i18n模块的初始locale。不是中文的一律显示英文
  fallbackLocale: 'zh', // 找不到翻译的就落到中文，可以避免再为中文写一份翻译库
  globalInjection: true,
  messages
})

// set global i18n record on window object. This for all applications to read during their init.
window.i18n = i18n.global.locale

// 同步代码在boot外，异步代码可能需要卸载boot里，但不保证成功
export default boot(({ app }) => {
  app.use(i18n)
})
