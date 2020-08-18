<template>
  <div class="base-layout" :style="height">
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import variables from '@/styles/variables.scss'

@Component({ name: 'BaseLayout' })
export default class BaseLayout extends Vue {
  get height() {
    return {
      height: `calc(100% - ${variables.navbarHeight})`
    }
  }
}
</script>
<style lang="scss" scoped>
.base-layout {
  position: relative;
}
</style>
