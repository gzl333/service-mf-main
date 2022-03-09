import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { Quasar } from 'quasar'
import messages from 'src/i18n'

// 获取浏览器locale, 因只提供英文和简体中文两种locale，只截取locale code的前两位
const browserLocale = Quasar.lang.getLocale()?.slice(0, 2)

export const i18n = createI18n({
  locale: browserLocale === 'zh' ? 'zh' : 'en', // i18n模块的初始locale。不是中文的一律显示英文
  fallbackLocale: 'zh', // 找不到翻译的就落到中文，可以避免再为中文写一份翻译库
  globalInjection: true,
  messages
})

export default boot(({ app }) => {
  app.use(i18n)
})
