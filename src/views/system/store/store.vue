<template>
  <div>store</div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableMixins from '@/mixins/tableMixins'

@Component({ name: 'Store' })
export default class Store extends mixins(TableMixins) {}
</script>
