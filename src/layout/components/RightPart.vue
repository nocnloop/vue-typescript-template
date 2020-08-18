<template>
  <div class="right-part" :style="partStyle">
    <Navbar />
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import variables from '@/styles/variables.scss'
import Navbar from './Navbar.vue'

@Component({ name: 'RightPart', components: { Navbar } })
export default class RightPart extends Vue {
  /** right-part 宽度 */
  get partStyle() {
    return {
      minWidth: `calc(1366px - ${variables.leftPartWidthMax} - ${variables.leftPartWidthMax})`,
      marginLeft: this.collapseState ? variables.leftPartWidthMin : variables.leftPartWidthMax
    }
  }

  /** 折叠状态 */
  get collapseState() {
    return AppModule.collapseState
  }
}
</script>
<style lang="scss" scoped>
.right-part {
  height: 100%;
  transition: margin-left 0.3s;
}
</style>
