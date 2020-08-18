import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


Vue.use(VueRouter)

/** 同步加载的路由 */
export const constantRoutes: RouteConfig[] = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  }
]


// 这些路由是放在最后并且必须的，如404
export const lastRequiredRoutes: RouteConfig[] = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]

// 开始构建私有路由，这些路由是私有的，需要配置用户权限
const modulesFiles = require.context('./modules', true, /\.ts$/)
// 得到的是挂载菜单根节点下，故为子路由
export const defaultRouteChildren: any[] = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  modules = modules.concat(value.default)
  return modules
}, [])



const createRouter = () => new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [...constantRoutes]
})

const router = createRouter()

/** https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465 */
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
