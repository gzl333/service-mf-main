import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue')
      }
    ]
  },
  {
    path: '/my',
    redirect: '/my/server'
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MyLayout.vue')
  }
]

export default routes
