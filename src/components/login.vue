<template>
  <div class="page_state">
    <div class="login">
      <div style="padding-top: 20px">
        <img
          src="http://www.axshare.cn/gsc/K7I9OT/bd/8f/65/bd8f65cd420c439a840ff7f82d6c32fd/images/登录界面/u986.svg?token=79591caae54d0def9744c4f6e6f8b901b7179964cdcc28500a46e2d0d7c356ed">
      </div>
      <div class="text" style="padding-top: 20px">
        <p style="font-size: 26px;color: #0079FE">
          <span style="font-family:'微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';font-weight:700;">
            Tt测试平台
          </span>
        </p>
      </div>
      <!--登陆表单-->
      <div style="margin: 20px;padding-top: 20px">
        <el-form :rules="checkLoginform" :model="Loginform" label-width="80px" :label-position="labelPosition">
          <el-form-item label="用户名:" prop="username">
            <el-input placeholder="请输入用户名" v-model="Loginform.username"></el-input>
          </el-form-item>
          <el-form-item label="密    码:" prop="password">
            <el-input placeholder="请输入密码" v-model="Loginform.password" show-password
                      @keyup.enter.native="loginHandler('Loginform')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginHandler('Loginform')"
                       style="margin-left: -80px;width: 380px;height: 50px">登陆
            </el-button>


          </el-form-item>
        </el-form>
      </div>
      <!--三方登陆-->
      <!--忘记密码-->
    </div>
  </div>
</template>

<script>
  import {login} from "../api/api";

  export default {
    data() {
      return {
        labelPosition: 'left',
        Loginform: {
          username: '',
          password: '',
        },
        checkLoginform: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        }
      }
    },
    methods: {
      loginHandler() {
        login(this.Loginform).then(res => {
          // localStorage.setItem('token', res.data[0].token);   // 存储token
          // localStorage.setItem('user', res.data[0].username);     // 存储用户名
          // this.$router.push({name: 'Home'});   //跳转
          // this.$message.success("登陆成功")
        })
      },
    }
  }
</script>

<style scoped>
  .page_state {
    background-color: rgba(0, 121, 254, 1);
    background-image: url("../assets/img/u977_state0.png");
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login {
    background-color: rgba(255, 255, 255, 1);
    text-align: center;
    width: 420px;
    height: 580px;
    border-radius: 20px;
  }
</style>
