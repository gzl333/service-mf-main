import { boot } from 'quasar/wrappers'
import useStore from 'src/store'

export default boot(async (/* { store } */) => {
  try {
    const store = useStore()
    console.log(window.location.origin)
    await store.reloadToken()
    console.log('after reload ')
  } catch (e) {
    console.log('Boot login error:', e)
  }
})
