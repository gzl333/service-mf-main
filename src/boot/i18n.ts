import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

import messages from 'src/i18n'

export default boot(({ app }) => {
  console.log('@cnic/main booting i18n!')
  const i18n = createI18n({
    locale: 'en-US',
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})
