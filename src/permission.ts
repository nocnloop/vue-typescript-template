import router from '@/router'
import { Route, NavigationGuardNext } from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { getAuthToken } from '@/utils/browser'
import { AppModule } from '@/store/modules/app'
import { MenuModule } from '@/store/modules/menu'

NProgress.configure({ showSpinner: false })


router.beforeEach(async (to: Route, _: Route, next: NavigationGuardNext) => {
  NProgress.start()
  try {
    const token = getAuthToken()
    if (token) {
      /** 
       * 是否初始化完成：
       * 1.菜单初始化
       *    - 拉取菜单
       *    - 构成菜单树
       * 2.字典初始化
       * 3.加载用户信息
       * 3.initState
       */
      if (AppModule.initState) {
        if (to.path === '/' || to.path === '/Login') {
          /** 去第一个有效路由 */
          next(MenuModule.sessionFirstRoute)
        } else {
          next()
        }
      } else {
        /** 菜单初始化 */
        await MenuModule.changeSessionMenuList()
        /** 字典初始化 */
        /** 用户信息初始化 */
        /** 最后改变状态 */
        await AppModule.changeInitState(true)
        /** 当前第一个菜单 */
        if (to.path === '/' || to.path === '/Login') {
          next({ path: MenuModule.sessionFirstRoute, replace: true })
        } else {
          next({ path: to.path, replace: true })
        }

      }
    } else {
      if (to.path === '/Login') {
        next()
      } else {
        next('/Login')
      }
      NProgress.done()
    }
  } catch (error) {
    console.log(error)
    NProgress.done()
  }

})

router.afterEach(() => {
  NProgress.done()
})