import Vue from 'vue'
import dictList from '@/dict/index'

const plugins = {
  install(Vue: any) {
    /** 函数防抖 */
    Vue.prototype.$debounce = (func: any, wait: number, _: any) => {
      return () => {
        _.timer && clearTimeout(_.timer)
        _.timer = setTimeout(func, wait)
      }
    }
    /** 字典反显 */
    Vue.prototype.$dictValue = (parentCode: string, code: number) => {
      const result = dictList.find(item => item.parentCode === parentCode && item.code === code)
      return result?.value
    }

    /** deep copy */
    Vue.prototype.$copy = (value: any) => {
      return JSON.parse(JSON.stringify(value))
    }
  }
}

Vue.use(plugins)
