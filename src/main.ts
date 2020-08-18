import '@/styles/index.scss'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { setStore } from '@/utils/browser'
import '@/plugin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/registerBase'
import '@/directive'
import '@/permission'
import GlobalMixins from '@/mixins/globalMixins';

((ElementUI.Dialog as any).props.closeOnClickModal.default as any) = false

setStore(JSON.stringify(store.state))

Vue.use(ElementUI, { size: 'small' })

Vue.mixin(GlobalMixins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
