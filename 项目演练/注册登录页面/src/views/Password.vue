<template>
  <div class="login-wrap">
    <h2>O365认证共通化应用</h2>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formData"
      class="login-form"
    >
      <span class="nav">找回密码</span>
      <span>请填写您需要找回的账号</span>
      <el-input class="inp" v-model="formData.info" placeholder="请您输入用户名/邮箱"></el-input>
      <div style="text-align:center">
        <el-button  type="primary" @click="toNext">下一步</el-button>
      </div>
      <div class="button">
        <el-button type="primary" plain @click.prevent="handleLogin()">登录</el-button>
        <el-button plain @click="toRegister">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formData: {
        info: ""
      }
    };
  },
  methods: {
     handleLogin() {
          this.$router.replace("/login");
    },
    toRegister() {
      this.$router.replace("/register");
    },
    toNext(){
      this.$router.push("/infrom")
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-image: url("../assets/background.png");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  box-sizing: border-box;
}
.nav {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  padding: 0 0 25px 0;

}
.inp {
  padding: 20px 0;
}

.button {
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
</style>
