<template>
  <div class="login">
    <el-form ref="loginForm" class="login-form" label-position="left" :model="loginForm">
      <!--系统名称-->
      <div class="title">
        <h3 class="text">
          XXXX ERP
        </h3>
      </div>
      <!--登录名-->
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model.trim="loginForm.username"
          placeholder="请输入账号"
          tabindex="1"
          type="text"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <!--登录密码-->
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          show-password
          tabindex="2"
          type="password"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-button :loading="isQuesting" style="width:100%;margin-bottom:30px;" tabindex="3" type="primary" @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableMixins from '@/mixins/tableMixins'
import { login } from '@/api/login/login'
import { setAuthToken } from '@/utils/browser'

@Component({ name: 'Login' })
export default class Login extends mixins(TableMixins) {
  loginForm = {
    username: 'admin',
    password: '123456'
  }

  /** 登录操作 */
  async handleLogin() {
    try {
      this.isQuesting = true
      const res = await login(this.loginForm, { errorTip: true })
      setAuthToken(res.data)
      await this.$router.replace('/')
    } catch (error) {
      console.log(error)
    } finally {
      this.isQuesting = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}

.login-form {
  position: relative;
  width: 500px;
  max-width: 100%;
  padding: 10% 35px 0;
  margin: 0 auto;
  overflow: hidden;
  .title {
    position: relative;
    height: 70px;
    .text {
      font-size: 26px;
      color: #eee;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
