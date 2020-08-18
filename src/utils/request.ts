import { Message } from 'element-ui'
import { getAuthToken } from './browser'
import axios from 'axios'
import qs from 'qs'

export interface IOtherParams {
  successTip?: boolean
  errorTip?: boolean
  [key: string]: any
}


// 创建axios实例
const request = axios.create({
  baseURL: globalConfig.baseServerURL,
  timeout: globalConfig.httpTimeOut,
  // 是否允许携带认证 不允许
  withCredentials: false
})

/** 请求拦截 */
request.interceptors.request.use(
  request => {
    /** 是否有其他参数 */
    // const otherParams: IOtherParams = (request as any).otherParams
    // 发送请求之前
    request.headers.token = getAuthToken()
    if (request.method === 'post') {
      request.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    // 获取当前菜单
    return request
  },
  error => {
    // 发送请求错误时
    return Promise.reject(error)
  }
)

/** 返回拦截 */
request.interceptors.response.use(
  response => {
    const otherParams: IOtherParams = (response.config as any).otherParams
    switch (response.data.code) {
      // 自定义code处理
      case 200:
        if (otherParams?.successTip) {
          Message({
            message: response.data.data,
            type: 'success',
            duration: 1000
          })
        }
        return Promise.resolve(response.data)
      case 401:
        Message({
          message: response.data.message,
          type: 'error',
          duration: 3000
        })
        return Promise.reject(response.data)
      default:
        if (otherParams?.errorTip) {
          Message({
            message: response.data.message,
            type: 'error',
            duration: 3000
          })
        }
        return Promise.reject(response.data)
    }
  },
  error => {
    // 错误响应
    Message({
      message: error.message,
      type: 'error',
      duration: 1000
    })
    return Promise.reject(error)
  }
)

export function httpGet(url: string, params: any, otherParams: any) {
  return request({
    method: 'get',
    url: url,
    params: params,
    otherParams: otherParams
  } as any)
}

export function httpPost(url: string, params: any, otherParams: any) {
  return request({
    method: 'post',
    url: url,
    data: qs.stringify(params),
    otherParams: otherParams
  } as any)
}

