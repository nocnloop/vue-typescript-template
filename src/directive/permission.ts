import { DirectiveOptions } from 'vue'
import router from '@/router'

export const permission: DirectiveOptions = {
  inserted(el, binding) {
    const actionList: any[] = (router.currentRoute.meta.actions as any[]).map(item => item.perms)
    if (!actionList.includes(binding.arg)) {
      el.style.display = 'none'
    }
  }
}
