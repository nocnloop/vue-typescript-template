<template>
  <div class="logo" :style="height">
    <!-- 未折叠 -->
    <div v-if="collapseState">
      <img :src="require('@/assets/sc.png')" style="width:100%;height:100%" />
    </div>
    <!-- 已折叠 -->
    <div v-else>
      <img :src="require('@/assets/smc.png')" style="width:100%;height:100%" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import variables from '@/styles/variables.scss'

@Component({ name: 'Logo' })
export default class Logo extends Vue {
  /** 折叠状态 */
  get collapseState() {
    return AppModule.collapseState
  }

  get height() {
    return {
      height: variables.navbarHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  div {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
