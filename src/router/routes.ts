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
      }
    ]
  },
  {
    path: '/my',
    component: () => import('layouts/MyLayout.vue'),
    props: true, // 接收url中的参数
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: '',
        component: () => import('pages/MyPage.vue'),
        redirect: '/my/server'
      }
    ]
  },
  {
    path: '/storage',
    component: () => import('layouts/StorageShareLayout.vue'),
    meta: {
      requireLogin: false
    }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requireLogin: true
    }
  }
]

export default routes
