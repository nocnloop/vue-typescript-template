import { httpGet, httpPost, IOtherParams } from '@/utils/request'


export interface IMenu {
  name?: string
  parentId?: number
  id?: number
  type?: string
  sort?: number
  isCatelog?: boolean
  children?: IMenu[]
}

export function menuFindRoleMenuList(params: any, otherParams?: IOtherParams) {
  return httpGet('/menu/findRoleMenuList', params, otherParams)
}


export function menuAddOrEdit(params: any, otherParams?: IOtherParams) {
  return httpPost('/menu/addOrEdit', params, otherParams)
}

export function menuGetAll(params: any, otherParams?: IOtherParams) {
  return httpGet('/menu/getAll', params, otherParams)
}


export function menuDelete(params: any, otherParams?: IOtherParams) {
  return httpGet('/menu/delete', params, otherParams)
}

export function menuGetHasPermsMenu(params: any, otherParams?: IOtherParams) {
  return httpGet('/menu/getHasPermsMenu', params, otherParams)
}








