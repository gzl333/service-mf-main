import { boot } from 'quasar/wrappers'
import { useStore } from 'stores/store'

export default boot(async (/* { store } */) => {
  try {
    const store = useStore()
    console.info('@cnic/main location: ', window.location.origin)
    await store.reloadToken()
  } catch (e) {
    console.log('@cnic/main Boot Reload error:', e)
  }
})
