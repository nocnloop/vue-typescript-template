import { httpGet, IOtherParams } from '@/utils/request'

// export interface IMenu {
//   name: string
//   parentId: number
//   id: number
//   type: string
//   isCatelog?: boolean
//   children?: IMenu[]
// }

export function roleFindPage(params: any, otherParams?: IOtherParams) {
  return httpGet('/role/findPage', params, otherParams)
}





