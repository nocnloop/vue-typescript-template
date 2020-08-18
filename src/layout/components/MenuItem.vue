<template>
  <div v-if="menu">
    <el-menu-item @click.native="selectPath(item.url)" :index="item.url">
      <i class="el-icon-link"></i>
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
  </div>
  <div v-else>
    <el-submenu :index="item.url" ref="el-submenu">
      <template slot="title">
        <i class="el-icon-folder"></i>
        <span slot="title">{{ item.name }}</span>
      </template>
      <MenuItem v-for="childItem in item.children" :key="childItem.id" :item="childItem" />
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IMenu } from '@/api/sys/menu'

@Component({ name: 'MenuItem' })
export default class MenuItem extends Vue {
  @Prop({ type: Object, default: () => null }) item!: IMenu

  /** 菜单或者按钮 */
  get menu() {
    return this.item.type === '2' || this.item.type === '3'
  }

  /** 选择菜单,跳转 */
  selectPath(url: string) {
    if (this.$route.path === url) {
      return
    }
    this.$router.push(url)
  }
}
</script>

<style lang="scss" scoped>
.el-submenu {
  overflow-x: hidden;
}

/deep/.el-submenu .el-submenu .el-submenu__title {
  background-color: #1f2d3d !important;
}

/deep/.el-submenu .el-menu-item {
  background-color: #1f2d3d !important;
}

/deep/ i[class^='el-icon'] {
  transform: translateY(-1px);
}

/deep/ .el-icon-arrow-down {
  transform: translateY(2px);
}

.el-menu--collapse {
  .el-submenu {
    /deep/ .el-submenu__icon-arrow,
    span {
      display: none;
    }
  }
}
</style>
