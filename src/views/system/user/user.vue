<template>
  <div>user</div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableMixins from '@/mixins/tableMixins'

@Component({ name: 'User' })
export default class User extends mixins(TableMixins) {}
</script>
