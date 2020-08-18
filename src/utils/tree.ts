import { IMenu } from '@/api/sys/menu'

/** 查询与当前node节点的parentId一致的node */
function findParentNode(menuList: Array<any>, currentNode: IMenu) {
  /** 找到当权节点的父级节点 */
  const parentNodeIndex = menuList.findIndex(item => item.id === currentNode.parentId)
  const parentNode = menuList[parentNodeIndex]
  if (parentNode) {
    /** parentNode 存在children属性 */
    if (parentNode.children) {
      /** children 中是否已经存在当前节点 */
      const findNodeItem = (parentNode.children as Array<IMenu>).find(item => item.id === currentNode.id)
      if (findNodeItem) return
      /** currentNode 的path需要提出来/的最后一个 */
      parentNode.children = [...parentNode.children, currentNode];
      /** 对内部的children数组进行排序 */
      (parentNode.children as any[]).sort((a, b) => a.sort - b.sort)

    } else {
      parentNode.children = [currentNode]
      /** 第一次寻找到父节点，除了以上的赋值外，还需要继续寻找父节点的上级节点（需要判断是否是根节点了） */
    }
    if (parentNode.parentId !== 0) {
      findParentNode(menuList, parentNode)
    }
  } else {
    /** 菜单类型没有父级节点，那么它属于最外层 */
    if (currentNode.type === '2') {
      currentNode.isCatelog = true
    }
  }
}

/** 将数组转化成树形结构 */
export function generateTree(menuList: Array<any>) {
  for (let i = 0, len = menuList.length; i < len; i++) {
    /** 目录 */
    if (menuList[i].parentId === 0) {
      continue
    }
    findParentNode(menuList, menuList[i])
  }
  /** 外部排序 */
  menuList.sort((a, b) => a.sort - b.sort)
  return menuList
}

