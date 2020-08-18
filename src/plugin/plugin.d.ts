import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $debounce: (func: Function, wait: number, _: any) => any

    $dictValue: (parentCode: string, code: number) => any

    $copy: (value: any) => any
  }
}
