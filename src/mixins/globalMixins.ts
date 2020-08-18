import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'GlobalMixins' })
export default class GlobalMixins extends Vue {
  /** 正在查询 */
  isQuesting = false
}
