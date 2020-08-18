import { RouteConfig } from 'vue-router'

const systemRoute: RouteConfig[] = [
  {
    path: 'Store',
    name: 'Store',
    component: () => import('@/views/system/store/store.vue')
  },
  {
    path: 'User',
    name: 'User',
    component: () => import('@/views/system/user/user.vue')
  },
  {
    path: 'Role',
    name: 'Role',
    component: () => import('@/views/system/role/role.vue')
  },
  {
    path: 'Menu',
    name: 'Menu',
    component: () => import('@/views/system/menu/menu.vue')
  },
  {
    path: 'Brand',
    name: 'Brand',
    component: () => import('@/views/system/dict/brand.vue')
  }
]

export default systemRoute
