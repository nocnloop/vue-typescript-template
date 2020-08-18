
import { httpPost, IOtherParams } from '@/utils/request'

export function login(params: any, otherParams?: IOtherParams) {
  return httpPost('/login', params, otherParams)
}
