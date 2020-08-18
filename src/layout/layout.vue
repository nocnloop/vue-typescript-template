<template>
  <div class="layout">
    <LeftPart />
    <RightPart />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LeftPart from './components/LeftPart.vue'
import RightPart from './components/RightPart.vue'

@Component({ name: 'Layout', components: { LeftPart, RightPart } })
export default class Layout extends Vue {}
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  position: relative;
}
</style>
