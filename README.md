- `el-dialog` 插槽中包裹的若是一个组件，那么它的 created、mounted 生命周期函数只会触发一次，解决办法是在 `el-dialog` 上添加 `v-if`，但是若是这样做了，将会失去一些动画效果，所以在暂时不添加的情况下一定注意一些特殊情况下的复杂操作，例如在 `created` 中添加了一些初始化的逻辑，因为只会触发一次，这时在父组件将子组件的 `created` 中的逻辑写好，子组件直接取值即可。

- `TableMixins` 中添加了一些组件共有的值或者方法，例如 `total`、`pageSize`、`currentPage`、`addVisible` 等，使用的时候记得继承此类

- API 接口命名依据后台接口命名，不需要前端自己根据当前业务起名，这样是为了以后修改方便

- 组件中添加、修改的命名规范是 `xxxAdd`、`xxxEdit`，前面省略部分为父组件的名称

- `xxxEdit` 组件在 `created` 函数内需要统一拷贝下传递的行数据的值（rowData）

- 对于一些需要全局挂载在 `this` 上的属性，需要在 `plugin/plugin.d.ts` 中添加

- `RightPart` 组件最小的宽度是 `1366px - LeftPart最大宽度*2`

- 弹窗组件的宽度应该是定值，600px或者800px，百分比容易在屏幕变小的情况下扭曲变形

- 字典暂时在store中自己建字典，页面暂时不添加

- 注释格式 `/** 保存 */`

- 登录完成之后需要完成的初始化操作
    - token存储
    - 当前用户信息的加载
    - 当前用户的菜单的加载
    - 所有菜单的加载
    - ...

- 关键字命名统一规范
    - rowData 行数据
    - watch装饰器下：@Watch('xxx') onXxxxChange
    - queryForm 查询表单数据
    - tableData 表格数据
    - formData 表单数据