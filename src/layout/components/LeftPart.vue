<template>
  <div class="left-part" :style="width">
    <Logo />
    <el-scrollbar :style="scrollbar">
      <el-menu
        :style="menu"
        :default-active="activeRoute"
        :collapse="collapseState"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse-transition="false"
      >
        <MenuItem v-for="item in leftMenuTree" :item="item" :key="item.id" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { MenuModule } from '@/store/modules/menu'
import variables from '@/styles/variables.scss'
import Logo from './Logo.vue'
import MenuItem from './MenuItem.vue'

@Component({ name: 'LeftPart', components: { Logo, MenuItem } })
export default class LeftPart extends Vue {
  /** 折叠状态 */
  get collapseState() {
    return AppModule.collapseState
  }

  /** left-part 宽度 */
  get width() {
    return {
      width: this.collapseState ? variables.leftPartWidthMin : variables.leftPartWidthMax
    }
  }

  /** 当前激活的路由 */
  get activeRoute() {
    return this.$route.path
  }

  /** 左边菜单 */
  get leftMenuTree() {
    return MenuModule.sessionMenuTree
  }

  get menu() {
    return {
      border: 'none'
    }
  }

  get scrollbar() {
    return {
      height: '100%',
      background: '#304156',
      overflow: 'hidden'
    }
  }
}
</script>
<style lang="scss" scoped>
.left-part {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  transition: width 0.3s;
  z-index: 2000;
}
</style>
