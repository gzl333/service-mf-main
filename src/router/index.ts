import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import routes from './routes'
import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// 二级路由（app）登记表：修改对应二级路由的title
const titleTable = {
  default: {
    zh: '中国科技云',
    en: 'CSTCloud'
  },
  my: {
    zh: '',
    en: ''
  },
  server: {
    zh: '云主机-',
    en: 'Cloud Server-'
  },
  storage: {
    zh: '对象存储-',
    en: 'Object Storage-'
  },
  share: {
    zh: '分享文件-',
    en: 'Shared Files-'
  },
  hpc: {
    zh: '高性能计算-',
    en: 'HPC-'
  },
  stats: {
    zh: '用量账单-',
    en: 'Billing-'
  },
  monitor: {
    zh: '综合监控-',
    en: 'Monitor-'
  },
  support: {
    zh: '用户支持-',
    en: 'Support-'
  },
  wallet: {
    zh: '钱包-',
    en: 'Wallet-'
  }
} as Record<string, Record<'zh' | 'en', string>>

export default route(function (/* { store/!* , ssrContext  *!/ } */) {
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

  // 调用全局的 ’beforeEach守卫‘ 比 ’路由配置beforeEnter‘ 更早执行
  Router.beforeEach(async (to, from, next) => {
    // for debugging
    // console.log('@cnic/main ', 'from:', from.fullPath, ' to:', to.fullPath)
    const store = useStore()
    const { isLogin } = store.items

    // 此处截获科技云登录接口跳转返回的 /clientURL?code=xxxx 部分
    // 未登录则获取code，换取token，进行登录
    // if (to.fullPath.includes('/login') && !isLogin) { // fullPath包括 path、 query 和 hash
    //   // 在科技云登录成功后，跳转至/login-passport?code=xxxx或/login-aai?code=xxxx。
    //   console.log(to.fullPath)
    //   // 此处截取code
    //   const code = to.fullPath.slice(to.fullPath.indexOf('=') + 1)
    //   console.log(code)
    //   // 此处区分是passport还是aai
    //   if (to.fullPath.includes('passport')) {
    //     void await store.userLogin('passport', code)
    //   } else if (to.fullPath.includes('aai')) {
    //     void await store.userLogin('aai', code)
    //   }
    //   // 跳转至内页
    //   next({ path: '/my' })
    // } else

    if (to.fullPath.startsWith('/login') && isLogin) {
      // 已经登录，访问/login，重定向到/my
      next({ path: '/my' })
    } else if (to.meta.requireLogin && !isLogin) {
      // 要求登录的页面，如果没有登录

      // localstorage记录所尝试的path
      localStorage.setItem('try_path', to.fullPath)

      // 返回home页面
      next({ path: '/' })
    } else if (!to.meta.requireLogin && isLogin) {
      // !!以下取消了，因为要在登录状态下查看/storage/share，该页面不需要登录。!!
      // 不要求登录的页面，如果已经登录，则跳转到/my
      // next({ path: '/my' })
    } else {
      // 之前都是登录状态有关的强制跳转。进入else后登录状态已经正常，进行页面访问权限的限制跳转
    }

    // 根据当前path（取第3位）更新store.currentApp，保证main里header的app选择正确。不写在header里是因为header只setup一次，不能实时根据路径更新
    store.items.currentApp = to.path.split('/')[2] || 'my'

    // 修改title
    if (titleTable[store.items.currentApp]) {
      // 能从table取到则合法, 修改对应title
      document.title = i18n.global.locale === 'zh' ? titleTable[store.items.currentApp].zh + titleTable.default.zh : titleTable[store.items.currentApp].en + titleTable.default.en
    }

    // my 统一跳转
    if (to.fullPath === '/my') {
      // 如果localstorage里有尝试path
      if (localStorage.getItem('try_path')) {
        const tryPath = localStorage.getItem('try_path') as string
        localStorage.removeItem('try_path')
        next({ path: tryPath })
      } else {
        // 没有就正常跳转
        next({ path: '/my/server' })
      }
    }

    // 不符合上述所有条件的catch-all跳转，否则会卡在空白页
    next()
  })

  return Router
})
