import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'

import store from '@/store'

export interface IAppState {
  collapseState: boolean
  initState: boolean
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  /** 菜单的折叠状态 */
  public collapseState = false
  /** 是否初始化 */
  public initState = false

  @Mutation
  private SET_COLLAPSE_STATE(collapseState: boolean) {
    this.collapseState = collapseState
  }


  @Mutation
  private SET_INIT_STATE(initState: boolean) {
    this.initState = initState
  }

  @Action
  public async changeCollapseState(collapseState: boolean) {
    this.SET_COLLAPSE_STATE(collapseState)
  }

  @Action
  public async changeInitState(initState: boolean) {
    this.SET_INIT_STATE(initState)
  }
}

export const AppModule = getModule(App)
