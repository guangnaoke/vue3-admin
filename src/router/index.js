import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue'),
    hidden: true
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'RedirectIndex',
        component: () => import('@/view/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'DashboardIndex',
        component: () => import('@/view/dashboard/index.vue'),
        meta: { title: 'dashboard', icon: 'dashboard' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/bucket',
    name: 'Bucket',
    component: Layout,
    redirect: '/bucket/index',
    meta: {
      roles: ['root', 'readwrite']
    },
    children: [
      {
        path: 'index',
        name: 'BucketIndex',
        component: () => import('@/view/bucket/index.vue'),
        meta: {
          title: 'bucket',
          icon: 'bucket',
          roles: ['root', 'readwrite']
        }
      }
    ]
  },
  {
    path: '/object',
    name: 'Object',
    component: Layout,
    hidden: true,
    redirect: '/object/index',
    meta: {
      roles: ['root', 'readwrite']
    },
    children: [
      {
        path: 'index',
        name: 'ObjectIndex',
        component: () => import('@/view/object/index.vue'),
        meta: {
          title: 'object',
          roles: ['root', 'readwrite']
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
