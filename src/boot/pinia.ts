import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
// import useStore from 'src/store/mainStore'

console.info('booting pinia')
const store = createPinia()

// export const mainStore = useStore()

export default boot(({ app }) => {
  app.use(store)
  app.config.globalProperties.$store = store
})
