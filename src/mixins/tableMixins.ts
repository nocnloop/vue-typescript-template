import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'TableMixins' })
export default class TableMixins extends Vue {
  /** 正在查询 */
  // isQuesting = false

  /** 表格数据 */
  tableData: any = []

  /** 总数 */
  total = 0

  /** 页码大小 */
  pageSize = 20

  /** 当前页码 */
  currentPage = 1

  /** 选中的行数据 */
  rowData: any = {}

  /** 新增 */
  addVisible = false

  /** 修改 */
  editVisible = false

  /** 查询，这里只是帮助afterAdd afterEdit能够调用,最后真实调用的还是组件中创建的query方法 */
  query() {
    // do...
  }

  /** 新增之后 */
  afterAdd() {
    this.query()
    this.addVisible = false
  }

  /** 修改之后 */
  afterEdit() {
    this.query()
    this.editVisible = false
  }
}
