import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { generateTree } from '@/utils/tree'
import { menuGetAll } from '@/api/sys/menu'
import { RouteConfig } from 'vue-router'
import router, { defaultRouteChildren, lastRequiredRoutes } from '@/router/index'
import Layout from '@/layout/layout.vue'


import store from '@/store'

export interface IMenuState {
  sessionFirstRoute: string
  sessionMenuList: any[]

}

@Module({ dynamic: true, store, name: 'menu' })
class Menu extends VuexModule implements IMenuState {
  /** 当前用户第一个有效的路由 */
  public sessionFirstRoute = ''
  /** 当前登录用户的菜单列表 */
  public sessionMenuList: any[] = []
  /** 当前登录用户的菜单列表 */
  public sessionMenuTree: any[] = []



  @Mutation
  private SET_SESSION_FIRST_ROUTE(sessionFirstRoute: any) {
    this.sessionFirstRoute = sessionFirstRoute
  }


  @Mutation
  private SET_SESSION_MENU_LIST(sessionMenuList: any) {
    this.sessionMenuList = sessionMenuList
  }

  @Mutation
  private SET_SESSION_MENU_TREE(sessionMenuTree: any) {
    this.sessionMenuTree = sessionMenuTree
  }





  @Action
  public async changeSessionMenuList() {
    /** 当前用户的菜单信息（这里接口错了,应该调当前人菜单接口） */
    const menuList: any[] = (await menuGetAll({})).data
    this.SET_SESSION_MENU_LIST(menuList)
    /** 找到第一个有效url */
    const firtRouteItem = menuList.find(item => item.type === '2')
    this.SET_SESSION_FIRST_ROUTE(firtRouteItem.url)
    /** 组装成树 */
    const treeList = generateTree(menuList)
    /** 只要树的目录和isCatelog为true的就是左边菜单栏的树形结构 */
    const leftMenuTree = treeList.filter(item => item.parentId === 0 || item.isCatelog)
    this.SET_SESSION_MENU_TREE(leftMenuTree)
    /** 路由注册 */
    let asyncRoutes: any[] = []
    for (let i = 0, len = treeList.length; i < len; i++) {
      if (treeList[i].type === '2') {
        const routeItem: any = defaultRouteChildren.find(item => '/' + item.path === treeList[i].url)
        if (routeItem) {
          const route: RouteConfig = {
            path: '/' + routeItem.path,
            component: Layout,
            children: [
              {
                path: '',
                name: routeItem.name,
                meta: {
                  actions: treeList[i].children || []
                },
                component: routeItem.component
              }
            ]
          }
          asyncRoutes.push(route)
        }
      }
    }
    asyncRoutes = asyncRoutes.concat(lastRequiredRoutes)
    router.addRoutes(asyncRoutes)
  }

}

export const MenuModule = getModule(Menu)
