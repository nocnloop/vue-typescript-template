// 全局配置
const globalConfig = {
  // http服务器的地址前缀
  baseServerURL: 'http://39.99.201.180:9999',
  // http请求超时时间 毫秒数
  httpTimeOut: 15000,
  // 浏览器共有数据存储方式 ck：cookie存储，ss：session storage存储 ls：local storage存储
  // cookie存储：实现共享标签页，关闭浏览器失效
  // session storage存储： 实现不同标签页不同会话，关闭浏览器失效
  // local storage存储：实现共享标签页，关闭浏览器不会失效，但是session服务端逻辑会有超时时间
  storageType: 'ls'
}
