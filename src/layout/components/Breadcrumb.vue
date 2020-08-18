<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="item.path" v-for="item in routeName" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Breadcrumb' })
export default class Breadcrumb extends Vue {
  get routeName() {
    const matchedRoute = this.$route.matched
    const lastMatchedRoute = matchedRoute[matchedRoute.length - 1]
    const lastPath = lastMatchedRoute.path
    const res = lastPath && lastPath[lastPath.length - 1] === '/'
    if (res) {
      return matchedRoute.slice(0, matchedRoute.length - 1)
    } else {
      return matchedRoute
    }
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  line-height: 44px;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.4s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(24px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
