import { RouteRecordRaw } from 'vue-router'
import { useStore } from 'stores/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    meta: {
      requireLogin: false
    },
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue')
      },
      {
        path: 'about',
        component: () => import('pages/AboutPage.vue')
      },
      {
        path: 'case',
        component: () => import('pages/CasePage.vue')
      },
      {
        path: 'login:afterLogin(.*)',
        component: {
          template: '' // 不渲染任何模板的空组件，本路由只用来接收 'login/passport?code=xxx' and ’login/aai?code=xxx‘
        },
        beforeEnter: async (to, from, next) => {
          // 获取store中的登录状态
          const store = useStore()
          const { isLogin } = store.items
          // 未登录则获取code，换取token，进行登录
          if (!isLogin) {
            // console.log(to.fullPath)
            // 此处截取code
            const code = to.fullPath.slice(to.fullPath.indexOf('=') + 1)
            // console.log(code)
            // 保存登录状态, 此处区分是passport还是aai
            if (to.fullPath.includes('passport')) {
              void await store.userLogin('passport', code)
            } else if (to.fullPath.includes('aai')) {
              void await store.userLogin('aai', code)
            }
            // 跳转至内页
            next({ path: '/my' })
          }
        }
      }
    ]
  },
  {
    path: '/my:afterMy(.*)',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requireLogin: true
    }
    // children: [
    //   {
    //     path: '',
    //     component: () => import('pages/MyPage.vue'),
    //     redirect: '/my/server'
    //   }
    // ]
  },
  {
    path: '/storage:afterStorage(.*)',
    component: () => import('layouts/StorageShareLayout.vue')
    // requireLogin既不是true也不是false，登录与否都可以访问该路由
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      requireLogin: true
    }
  }
]

export default routes
