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
      <div class="content">    <span>密码重置成功 </span>
      <span>请登录</span></div>
  
      <div class="btn" style="text-align:center ">
        <el-button  type="primary" @click="toLogin">登录</el-button>
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
     toLogin() {
          this.$router.replace("/login");
    },
    
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
.content{
  text-align: center;
  padding: 10px;
}
.btn{
  padding-top: 30px;
}
</style>
