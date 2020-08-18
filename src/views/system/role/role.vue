<template>
  <BaseLayout>
    <!-- 按钮 -->
    <div class="botton-area" :style="bottonAreaStyle">
      <el-button v-permission:add icon="el-icon-plus" type="primary" @click="addVisible = true">新增</el-button>
    </div>
  </BaseLayout>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableMixins from '@/mixins/tableMixins'
import { roleFindPage } from '@/api/sys/role'
import variables from '@/styles/variables.scss'

@Component({ name: 'Role' })
export default class Role extends mixins(TableMixins) {
  /** 顶部按钮区域样式 */
  get bottonAreaStyle() {
    return {
      height: variables.queryHeight
    }
  }

  created() {
    this.pageInit()
  }

  pageInit() {
    this.query()
  }

  queryForm: any = {}

  async query() {
    try {
      this.isQuesting = true
      const res = await roleFindPage({
        limit: this.pageSize,
        page: this.currentPage,
        ...this.queryForm
      })
      this.tableData = res.data
    } catch (error) {
      console.log(error)
    } finally {
      this.isQuesting = false
    }
  }
}
</script>
<style lang="scss" scoped>
.botton-area {
  display: flex;
  align-items: center;
  padding: 0px 10px;
}
</style>
