<template>
  <div class="menu-add">
    <el-form ref="form" :model="formData" :rules="rules" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="parentId">
            <el-popover v-model="popoverVisible" placement="bottom" width="470">
              <el-input slot="reference" :value="nodeName" placeholder="请输入上级菜单" />
              <el-tree :data="treeDataHasRoot" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="选择类型" prop="type">
            <el-radio-group v-model="formData.type">
              <el-radio label="1">目录</el-radio>
              <el-radio label="2">菜单</el-radio>
              <el-radio label="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="name" prop="name">
            <el-input v-model="formData.name" :placeholder="`请输入${name}`" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="menu">
          <!-- 目录 -->
          <el-form-item v-if="formData.type === '1'" label="路由地址" prop="url">
            <el-input v-model="formData.url" placeholder="请输入路由地址" />
          </el-form-item>
          <!-- 菜单 -->
          <el-form-item v-else label="路由地址" prop="url">
            <el-select v-model="formData.url" placeholder="请输入路由地址">
              <el-option v-for="item in routePathList" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 图标 -->
        <el-col :span="12">
          <el-form-item :label="icon" prop="icon">
            <el-input v-model="formData.icon" :placeholder="`请输入${icon}`" />
          </el-form-item>
        </el-col>
        <!-- 显示顺序 -->
        <el-col :span="12">
          <el-form-item label="显示顺序" prop="sort">
            <el-input-number style="width:100%" v-model="formData.sort" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <!-- 权限标识 -->
        <el-col :span="12" v-if="perms">
          <el-form-item label="权限标识" prop="perms">
            <el-input v-model="formData.perms" placeholder="请输入权限标识" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer" style="text-align:center">
      <el-button type="primary" :loading="isQuesting" @click="save">保 存</el-button>
      <el-button @click="$emit('cancel')">取 消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { IMenu, menuAddOrEdit } from '@/api/sys/menu'

@Component({ name: 'MenuAdd' })
export default class MenuAdd extends Vue {
  @Prop({ type: Array, default: () => [] }) treeData!: any[]
  @Prop({ type: Array, default: () => [] }) routePathList!: any[]

  get name() {
    switch (this.formData.type) {
      case '1':
        return '目录名称'
      case '2':
        return '菜单名称'
      case '3':
        return '按钮名称'
    }
  }

  get icon() {
    switch (this.formData.type) {
      case '1':
        return '目录图标'
      case '2':
        return '菜单图标'
      case '3':
        return '按钮图标'
    }
  }

  get menu() {
    return this.formData.type === '1' || this.formData.type === '2'
  }

  get perms() {
    return this.formData.type === '2' || this.formData.type === '3'
  }

  /** 添加根节点的目录 */
  get treeDataHasRoot() {
    return [
      {
        name: '根节点',
        id: 0,
        children: [...this.treeData]
      }
    ]
  }

  rules: any = {
    name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
    parentId: [{ required: true, message: '上级菜单不能为空', trigger: 'blur' }]
  }

  formData: IMenu = {
    sort: 0,
    type: '2' // 默认是菜单类型
  }

  defaultProps = {
    children: 'children',
    label: 'name'
  }

  /** 树形结构弹窗 */
  popoverVisible = false

  /** 选中的节点名称 */
  nodeName = ''

  /** 保存 */
  save() {
    ;(this.$refs.form as Form).validate(async valid => {
      if (!valid) return
      try {
        this.isQuesting = true
        await menuAddOrEdit(this.formData, { errorTip: true })
        this.$emit('afterAdd')
      } catch (error) {
        console.log(error)
      } finally {
        this.isQuesting = false
      }
    })
  }

  handleNodeClick(data: any) {
    this.popoverVisible = false
    this.nodeName = data.name
    ;(this.formData as any).parentId = data.id
  }
}
</script>
