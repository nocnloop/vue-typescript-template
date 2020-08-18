<template>
  <div class="nav-bar" :style="height">
    <div class="left">
      <i @click.stop="updateCollapseState" class="collapse-icon" :class="icon"></i>
      <!-- <Breadcrumb /> -->
    </div>
    <el-dropdown placement="bottom-start" trigger="click" @command="handleCommand">
      <div>
        <img class="avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import Breadcrumb from './Breadcrumb.vue'
import variables from '@/styles/variables.scss'
import { resetRouter } from '@/router'
import { removeAuthToken, getSotre } from '@/utils/browser'

@Component({ name: 'Navbar', components: { Breadcrumb } })
export default class Navbar extends Vue {
  /** 折叠状态 */
  get collapseState() {
    return AppModule.collapseState
  }

  get icon() {
    const iconClass = this.collapseState ? 'el-icon-s-fold' : 'el-icon-s-unfold'
    return [iconClass]
  }

  get height() {
    return {
      height: variables.navbarHeight
    }
  }

  updateCollapseState() {
    AppModule.changeCollapseState(!this.collapseState)
  }

  exit() {
    /** 清空动态路由 */
    resetRouter()
    /** 清空token */
    removeAuthToken()
    /** vuex恢复默认值 */
    // https://www.cnblogs.com/lwming/p/10926562.html
    // https://www.cnblogs.com/zhongchao666/p/9567527.html
    this.$store.replaceState = Object.assign(this.$store.state, JSON.parse(getSotre()))
    this.$router.replace('/Login')
  }

  handleCommand(command: string) {
    if (command === 'exit') {
      this.exit()
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.left {
  display: flex;
}

.collapse-icon {
  font-size: 24px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #5a5e66;
  &:hover {
    cursor: pointer;
  }
}
.avatar-icon {
  transform: translateY(2px);
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin-right: 10px;
  transform: translateY(2px);
}
.el-icon-caret-bottom {
  margin-right: 30px;
  font-size: 12px;
  color: #5a5e66;
  cursor: pointer;
}

.el-dropdown-menu {
  margin-right: 30px;
}

.el-dropdown-menu__item {
  text-align: center;
  width: 100px;
}
</style>
