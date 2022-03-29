import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import routes from './routes'
import useStore from 'src/store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0
    }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  Router.beforeEach(async (to, from, next) => {
    console.log('@cnic/main ', 'from:', from.fullPath, ' to:', to.fullPath)
    const store = useStore()
    const isLogin = store.items.isLogin

    // 此处截获科技云通行证返回的 /login?code=xxxx 部分
    // 未登录则获取code，换取token，进行登录
    if (to.fullPath.includes('/login?code=') && !isLogin) { // fullPath包括 path、 query 和 hash
      // debugger
      // 在科技云通行证处登录成功后，跳转至/login?code=xxxx。 此处截取code
      const code = to.fullPath.slice(12)
      // 利用code，在updatePassportToken中获取token并保存token，改变用户登录状态
      void await store.userLogin('passport', code)
      // 跳转至内页
      next({ path: '/my' })
    } else if (to.fullPath.startsWith('/login') && isLogin) {
      // debugger
      // 已经登录，访问/login，重定向到/my
      next({ path: '/my' })
    } else if (to.meta.requireLogin && !isLogin) {
      // debugger
      // 要求登录的页面，如果没有登录，则返回home页面
      next({ path: '/' })
    } else if (!to.meta.requireLogin && isLogin) {
      // debugger
      // 不要求登录的页面，如果已经登录，则跳转到/my
      next({ path: '/my' })
    } else {
      // 之前都是登录状态有关的强制跳转。进入else后登录状态已经正常，进行页面访问权限的限制跳转
    }

    // if (to.meta.title) {
    //   document.title = to.meta.title as string
    // }
    document.title = '中国科技云一体化云服务平台'

    // 不符合上述所有条件的catch-all跳转，否则会卡在空白页
    next()
  })

  return Router
})
