<template>
  <div>category</div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableMixins from '@/mixins/tableMixins'

@Component({ name: 'Brand' })
export default class Brand extends mixins(TableMixins) {}
</script>
