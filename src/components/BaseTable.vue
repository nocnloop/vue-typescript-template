<template>
  <div class="base-table" :style="baseTableStyle">
    <div class="top-table" :style="topTableStyle">
      <el-table
        v-bind="$attrs"
        border
        ref="table"
        height="100%"
        :data="tableData ? tableData : []"
        :cell-style="{
          borderRight: '1px solid transparent !important'
        }"
        :header-cell-style="{
          background: '#e4e4e4!important',
          padding: '5px 0px'
        }"
      >
        <!-- 中间主体 -->
        <slot />
      </el-table>
    </div>
    <div class="bottom-pagination" :style="bottomPaginationStyle">
      <el-pagination
        background
        layout="total, sizes,  prev, pager, next, jumper"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :pageSizes="[10, 20, 30, 40]"
        :total="total"
        @current-change="pageChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import variables from '@/styles/variables.scss'

@Component({ name: 'BaseTable' })
export default class BaseTable extends Vue {
  @Prop({ type: Array, default: () => [] }) tableData!: any[]
  @Prop({ type: Number, default: 1 }) currentPage!: number
  @Prop({ type: Number, default: 20 }) pageSize!: number
  @Prop({ type: Number, default: 0 }) total!: number

  get baseTableStyle() {
    return {
      height: `calc(100% - ${variables.queryHeight})`
    }
  }

  get topTableStyle() {
    return {
      height: `calc(100% - ${variables.paginationHeight})`
    }
  }

  get bottomPaginationStyle() {
    return {
      height: variables.paginationHeight,
      lineHeight: variables.paginationHeight
    }
  }

  query() {
    ;(this as any).$debounce(
      () => {
        if ((this.$parent as any).query) {
          ;(this.$parent as any).query()
        } else {
          ;(this.$parent.$parent as any).query()
        }
      },
      50,
      this
    )()
  }

  pageChange(val: number) {
    this.$emit('update:currentPage', val)
    this.query()
  }

  sizeChange(val: number) {
    this.$emit('update:pageSize', val)
    this.query()
  }
}
</script>
<style lang="scss" scoped>
.base-table {
  padding: 0px 10px;
  overflow: hidden;
}

/deep/ .el-table {
  border-left: none;
}

.no-16 {
  /deep/ .el-table__fixed {
    height: 100% !important;
  }
  /deep/ .el-table__fixed-right {
    height: 100% !important;
  }
}

.has-16 {
  /deep/ .el-table__fixed {
    height: calc(100% - 16px) !important;
  }
  /deep/ .el-table__fixed-right {
    height: calc(100% - 16px) !important;
  }
}

/deep/ .el-pagination {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-right: 16px;
}
</style>
