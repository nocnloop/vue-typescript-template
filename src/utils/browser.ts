function getValue(key: string) {
  let value: any = ''
  switch (globalConfig.storageType) {
    case 'ss': {
      value = sessionStorage.getItem(key)
      break
    }
    case 'ls': {
      value = localStorage.getItem(key)
      break
    }
    default:
      break
  }
  return value
}

function setValue(key: string, value: any) {
  switch (globalConfig.storageType) {
    case 'ss': {
      sessionStorage.setItem(key, value)
      break
    }
    case 'ls': {
      localStorage.setItem(key, value)
      break
    }
    default:
      break
  }
}

function removeValue(key: string) {
  switch (globalConfig.storageType) {
    case 'ss': {
      sessionStorage.removeItem(key)
      break
    }
    case 'ls': {
      localStorage.removeItem(key)
      break
    }
    default:
      break
  }
}


// 定义浏览器存储中authToken的操作方法
export const tokenName = 'vue-typescript-template'

export const storeName = 'vue-typescript-template-store'

export function getAuthToken() {
  return getValue(tokenName)
}

export function setAuthToken(value: string) {
  setValue(tokenName, value)
}

export function removeAuthToken() {
  removeValue(tokenName)
}

export function getSotre() {
  return getValue(storeName)
}

export function setStore(value: string) {
  setValue(storeName, value)
}

export function removeStore() {
  removeValue(storeName)
}

