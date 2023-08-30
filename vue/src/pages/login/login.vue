<template>
  <div id="home">
    <el-row :gutter="20" v-loading="loginLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :span="16" :offset="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 30px;font-family: sans-serif;font-weight: bold">用户登录</span>
            <!--            <el-button style="float: right; padding: 3px 0" type="text">注册</el-button>-->
          </div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
            <el-form-item label="用户" prop="username">
              <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="记住用户">
              <el-switch v-model="rememberMe"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="submitForm('ruleForm')" ref="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <div class="footer">
      <el-tooltip class="item" effect="dark" content="如果需要查看效果,请关注下面作者的CSDN账号;私信给我：查看效果;看到后我会及时回复账号密码" placement="top">
        <i class="el-icon-info">注意信息</i>
      </el-tooltip>
      <br>
      <br>
      © Copyright 2021-2022 <a href="https://jackie-sun.blog.csdn.net/"
                               target="_blank">作者:孙霸天</a> All Rights Reserved
    </div>
  </div>
</template>

<script>
import {login, logLogin} from "@/api/api";

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      logLogin: {
        username: '',
        password: '',
        status: '',
      },
      rememberMe: false,
      loginLoading: false, // 登录的 loading 状态
      rules: {
        username: [
          {required: true, message: '请输入用户名！', trigger: 'blur'},
          {min: 5, message: '长度不小于5个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码！', trigger: 'blur'},
          {min: 8, message: '长度不小于8个字符', trigger: 'blur'}
        ],
      }
    }
  },
  watch: {
    rememberMe: 'rememberUsername'
  },
  mounted() {
    //绑定事件，其他界面可能要写在methods里
    window.addEventListener('keydown', this.keyDown);
    this.isRememberUsername();

  },
  methods: {

    //绑定监听事件
    keyDown(e) {
      let that = this;
      //如果是按回车则执行登录方法
      if (e.keyCode === 13) {
        this.$refs.login.$el.click()
      }
    },

    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 开启登陆中 loading...
          that.loginLoading = true
          if (that.rememberMe) {
            window.sessionStorage.setItem('username', that.ruleForm.username)
          }
          that.logLogin.password = that.ruleForm.password;
          that.logLogin.username = that.ruleForm.username;
          that.logLogin.status = '0';
          login(that.ruleForm).then(res => {
            //console.log(res.data);
            let message = res.data.message;
            if (res.data.code === 200) {
              that.loginLoading = false; // 登录的 loading 状态
              //登录成功
              that.$message({
                message: message,
                type: 'success'
              })
              //vuex 管理连接数据
              // that.$store.commit('setCommunicationInfo', res.data)
              //记录登陆者信息
              window.sessionStorage.setItem('communicationInfo', JSON.stringify(res.data))
              let redirect = decodeURIComponent(that.$route.query.redirect || 'index');
              that.$router.push({
                name: redirect
              });
              that.logLogin.status = '1';
            } else {
              //登录失败
              that.$message.error(
                  message
              )
            }
          }).catch(err => { // 登录失败
            console.log('登录失败', err)
            that.loginLoading = false
          }).finally(() => {
            that.loginLoading = false;
            logLogin(that.logLogin).then(res => {
              if (res.data.code === 200) {
              }
            })
          })

        } else {
          return false;
        }
      });
    },
    rememberUsername() {
      let that = this;
      let username = window.sessionStorage.getItem('username');
      if (!that.rememberMe) {
        console.log('2')
        if (username != null) {
          console.log(username)
          window.sessionStorage.removeItem('username')
        }
      }
    },
    isRememberUsername() {
      let that = this;
      let username = window.sessionStorage.getItem('username');
      if (username != null) {
        that.rememberMe = true;
        that.ruleForm.username = username;
        console.log(username);
      }
    }
  }
}
</script>

<style scoped>
.footer {
  bottom: 5%;
  margin-top: 2.5rem;
  padding: 2.5rem;
  border-top: 1px solid #eaecef;
  text-align: center;
  color: #4e6e8e;
}

#home {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.el-row {
  margin-top: 15%;
}

.el-card {
  max-width: 500px;
  left: 0;
  right: 0;
  margin: auto;
}

</style>