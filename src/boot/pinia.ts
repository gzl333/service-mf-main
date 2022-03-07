import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'

const store = createPinia()

export default boot(({ app }) => {
  app.use(store)
})
