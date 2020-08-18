import Vue from 'vue'
import { permission } from './permission'

const filters: any = { permission }

Object.keys(filters).forEach(key => {
  Vue.directive(key, filters[key])
})
