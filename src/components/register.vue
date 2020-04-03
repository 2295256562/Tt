<template>
  <div class="page_state">
    <div class="login">

      <el-form ref="RegForm" :model="RegForm" label-width="70px" style="margin-top: 40px;margin-left: 20px">
        <el-form-item label="用户名">
          <el-input v-model="RegForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密  码">
          <el-input v-model="RegForm.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码">
          <el-input v-model="RegForm.password2"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="RegForm.moblie"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="RegForm.email"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            style="text-align: left;margin-left: 16px"
            action="this.dialogFileUpload.uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="RegForm.avatar" :src="RegForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


        <el-button style="width: 88%" type="primary" @click="RegSubmit">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {register} from '../api/api'

    export default {

        data() {
            return {
                RegForm: {
                    username: '',
                    password: '',
                    password2: '',
                    moblie: '',
                    email: '',
                    // avatar: ''
                },

            }
        },

        methods: {
            handleAvatarSuccess(res, file) {
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },


            // 注册接口
            RegSubmit() {
                register(this.RegForm).then(res => {
                    // console.log(res.data)
                    this.$message.success("注册成功");
                    this.$router.push({
                        path: '/login',
                    })
                })
            },
        },
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
    width: 22%;
    height: 60%;
    border-radius: 20px;
  }
</style>

<style>
  .el-input__inner {
    width: 90%
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
