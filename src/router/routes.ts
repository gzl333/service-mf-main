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
