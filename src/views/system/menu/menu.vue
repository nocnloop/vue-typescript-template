<template>
  <BaseLayout>
    <!-- 按钮 -->
    <div class="botton-area" :style="bottonAreaStyle">
      <el-button icon="el-icon-plus" type="primary" @click="addVisible = true">新增</el-button>
    </div>
    <!-- 表格 -->
    <BaseTable
      v-loading="isQuesting"
      :tableData="tableData"
      :currentPage.sync="currentPage"
      :total.sync="total"
      row-key="addtime"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- 菜单名称 -->
      <el-table-column prop="name" label="菜单名称" min-width="160"></el-table-column>
      <!-- 项目类型 -->
      <el-table-column label="项目类型" align="center" min-width="160">
        <template slot-scope="{ row }"> {{ $dictValue('menu', Number(row.type)) }} </template>
      </el-table-column>
      <!-- 路由地址 -->
      <el-table-column prop="url" label="路由地址" align="center" min-width="160" />
      <!-- 权限标识 -->
      <el-table-column prop="perms" label="权限标识" align="center" min-width="160" />
      <!-- 显示顺序 -->
      <el-table-column prop="sort" label="显示顺序" align="center" min-width="160" />
      <!-- 操作 -->
      <el-table-column label="操作" align="center" min-width="220">
        <template slot-scope="{ row }">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="rowEdit(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="rowDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </BaseTable>
    <!-- 新增 -->
    <el-dialog v-if="addVisible" title="新增" width="600px" :visible.sync="addVisible">
      <MenuAdd :treeData="tableData" :routePathList="routePathList" @afterAdd="afterAdd" @cancel="addVisible = false" />
    </el-dialog>
    <!-- 修改 -->
    <el-dialog v-if="editVisible" title="修改" width="600px" :visible.sync="editVisible">
      <MenuEdit :rowData="rowData" :routePathList="routePathList" :treeData="tableData" @afterEdit="afterEdit" @cancel="editVisible = false" />
    </el-dialog>
  </BaseLayout>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { menuGetAll, menuDelete } from '@/api/sys/menu'
import TableMixins from '@/mixins/tableMixins'
import MenuAdd from './components/MenuAdd.vue'
import MenuEdit from './components/MenuEdit.vue'
import { generateTree } from '@/utils/tree'
import variables from '@/styles/variables.scss'
import { defaultRouteChildren } from '@/router/index'

@Component({ name: 'Menu', components: { MenuAdd, MenuEdit } })
export default class Menu extends mixins(TableMixins) {
  /** 顶部按钮区域样式 */
  get bottonAreaStyle() {
    return {
      height: variables.queryHeight
    }
  }

  /** 菜单列表源数据 */
  sourceList: any[] = []

  /** 项目中定义的路由地址 */
  routePathList: any[] = []

  created() {
    this.pageInit()
  }

  /** 页面初始化 */
  pageInit() {
    /** 项目现有的路由配置 */
    this.routePathList = defaultRouteChildren.map(item => `/${(item as any).path}`)
    this.query()
  }

  /** 查询 */
  async query() {
    try {
      this.isQuesting = true
      const menuList: any[] = (await menuGetAll({})).data
      /** 暂存一份源数据 */
      this.sourceList = this.$copy(menuList)
      /** 构成树形结构 */
      const treeList = generateTree(menuList)
      /** 只取是目录或者最外层的菜单 */
      this.tableData = treeList.filter(item => item.parentId === 0 || item.isCatelog)
    } catch (error) {
      console.log(error)
    } finally {
      this.isQuesting = false
    }
  }

  /** 行编辑 */
  rowEdit(rowData: any) {
    this.rowData = this.sourceList.find(item => item.id === rowData.id)
    this.editVisible = true
  }

  /** 行删除 */
  async rowDelete(rowData: any) {
    try {
      await this.$confirm('确认删除吗?', '确认提示')
      this.isQuesting = true
      await menuDelete({ id: rowData.id })
      this.query()
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
