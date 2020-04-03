<template>
  <div class="page_state">
    <div class="login">
      <div style="padding-top: 20px">
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
            <el-button type="" @click="RegHandler"
                       style="margin-left: -80px;width: 380px;height: 50px; margin-top: 6px">注册账号
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--三方登陆-->
      <div style="display: flex">
        <div style="float: left">
          <el-checkbox v-model="checked" style="padding-left: 20px">记住密码</el-checkbox>
        </div>
        <div style="margin-left: 55%" class="three">
          <span style="overflow: hidden;" @click="ForgotPassword">忘记密码?</span>
        </div>

      </div>

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
                },
                checked: false
            }
        },
        methods: {

            //登陆
            loginHandler() {
                login(this.Loginform).then(res => {
                    // console.log(res.data.token);
                    //判断用户是否点击记住密码
                    if (this.checked) {
                        // 记住密码
                        localStorage.token = res.data.token;
                        sessionStorage.token = null;
                    } else {
                        //没记住密码
                        sessionStorage.token = res.data.token;
                        localStorage.token = null;
                        localStorage.user = res.data.username;
                    }
                    //跳转
                    this.$message.success(this.Loginform.username + "：登陆成功")
                    this.$router.push({name: 'Index'});
                    // this.$message.success("登陆成功")
                }).catch(err => {
                    console.log(err.data);
                    this.$message.error(err.data.non_field_errors[0])
                })
            },

            // 忘记密码
            ForgotPassword() {
                alert('请联系管理员')
            },

            // 注册
            RegHandler() {
                this.$router.push({
                    path: 'register',
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
    height: 46%;
    border-radius: 20px;
  }
</style>

<style>
  .three > span:hover {
    /*background-color: #0079FE;*/
    color: #409EFF;
    cursor: pointer
  }
</style>
