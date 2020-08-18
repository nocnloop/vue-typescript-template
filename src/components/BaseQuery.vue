<template>
  <div class="base-query">
    <!-- 查询按钮 -->
    <div class="top" :style="queryStyle">
      <div class="btn-left">
        <slot name="left" />
        <el-button-group class="btn-group">
          <el-button icon="el-icon-search" size="small" type="primary" @click="query">
            查询
          </el-button>
          <el-button size="small" type="primary" @click="openDrawer">
            选项
            <i class="el-icon-arrow-down deg-transition" :style="arrow" />
          </el-button>
        </el-button-group>
        <el-button v-if="queryFormEmptySate" class="btn-clear" icon="el-icon-delete" size="small" type="warning" @click.stop="clearQuery">
          重置查询条件
        </el-button>
      </div>
      <div class="btn-right">
        <slot name="right" />
      </div>
    </div>

    <!-- 查询具体参数 -->
    <el-drawer
      ref="eleDrawer"
      direction="ttb"
      :modal="false"
      :show-close="false"
      :style="eleDrawerStyle"
      :visible.sync="visible"
      :with-header="false"
      size=""
    >
      <div class="query-wrap">
        <slot />
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import variables from '@/styles/variables.scss'

@Component({ name: 'BaseQuery' })
export default class BaseQuery extends Vue {
  /** 查询条件 */
  @Prop({ type: Object, default: () => null }) queryForm!: any

  /** 查询栏的高度 */
  get queryHeight() {
    return variables.queryHeight
  }

  /** 查询栏样式 */
  get queryStyle() {
    return {
      height: variables.queryHeight
    }
  }

  /** 查询按钮icon的方向 */
  get arrow() {
    return {
      transform: this.visible ? 'rotate(-180deg)' : ''
    }
  }

  /** 折叠状态 */
  get collapseState() {
    return AppModule.collapseState
  }

  /** element抽屉的样式 */
  get eleDrawerStyle() {
    return {
      top: `calc(${variables.navbarHeight} + ${variables.queryHeight})`,
      left: 0,
      right: 0,
      marginLeft: this.collapseState ? variables.leftPartWidthMin : variables.leftPartWidthMax,
      transition: 'margin-left 0.3s'
    }
  }

  /** 查询条件是否是空值状态 */
  get queryFormEmptySate() {
    return JSON.stringify(this.queryForm) !== JSON.stringify(this.defaultQueryForm)
  }

  /** ele dropdown 组件是sync */
  visible = false

  /** 暂存查询条件默认值 */
  defaultQueryForm = null

  created() {
    /** 存储默认查询条件 */
    this.defaultQueryForm = { ...this.queryForm }
  }

  // 切换抽屉
  openDrawer() {
    this.visible = !this.visible
  }

  /** 触发查询按钮 */
  query() {
    this.$emit('query')
  }

  /** 清除查询条件 */
  clearQuery() {
    for (const key in this.queryForm) {
      this.queryForm[key] = this.defaultQueryForm?.[key]
    }
  }
}
</script>

<style lang="scss" scoped>
.base-query {
  position: relative;
  padding: 0px 10px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn-left {
      .el-button + .btn-group {
        margin-left: 10px;
      }
      .btn-clear {
        margin-left: 10px;
      }
    }

    .btn-right {
      display: flex;
      float: right;
    }
  }
  .query-wrap {
    /deep/ .el-form-item__label {
      font-size: 13px;
      color: #909090;
      font-weight: bold;
    }
  }
}

/deep/.el-drawer {
  box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.14);
}
</style>
