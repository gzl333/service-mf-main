import { RouteRecordRaw } from 'vue-router'

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
