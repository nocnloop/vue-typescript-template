const dictList = [
  /** 订单状态 */
  { code: 'order', parentCode: 'root', value: '订单状态', color: '', order: 0 },
  { code: 0, parentCode: 'order', value: '待付款', color: '', order: 0 },
  { code: 1, parentCode: 'order', value: '已付款', color: '', order: 1 },
  { code: 2, parentCode: 'order', value: '送货中', color: '', order: 2 },
  { code: 3, parentCode: 'order', value: '已签收', color: '', order: 3 },
  { code: 4, parentCode: 'order', value: '已完成', color: '', order: 4 },
  /** 菜单类型 */
  { code: 'menu', parentCode: 'root', value: '菜单类型', color: '', order: 0 },
  { code: 1, parentCode: 'menu', value: '目录', color: '', order: 0 },
  { code: 2, parentCode: 'menu', value: '菜单', color: '', order: 0 },
  { code: 3, parentCode: 'menu', value: '按钮', color: '', order: 0 }

]

export default dictList
