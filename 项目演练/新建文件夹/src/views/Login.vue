<template>
  <div class="login-wrap">
    <h2>O365认证共通化应用</h2>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formData"
      class="login-form"
    >
      <div class="nav">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <el-form-item label="用户名：">
        <el-input v-model="formData.name" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="Password"
        ></el-input>
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click.prevent="handleLogin()"
          >登录</el-button
        >
        <el-button @click="toRegister">注册</el-button>
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
        name: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.axios.get("http://127.0.0.1:3000/users", {
        params: {
          email: this.formData.email,
          name: this.formData.name,
        },
      });
      console.log(res.data.length);
      if(res.data.length){
        this.$message.success("登陆成功");
        this.$router.push('/')
      }else{
        this.$message.warning("登陆失败")
      }
    },
    toRegister() {
      this.$router.replace("/register");
    },
  },
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
h2 {
  text-align: center;
  color: #fff;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  box-sizing: border-box;
}
.nav {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  font-weight: bold;
  text-align: center;
}
.nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
.nav a.router-link-exact-active {
  padding-bottom: 5px;
  border: solid #3a62d7;
  border-width: 0 0 2px 0;
}

.button {
  text-align: center;
  display: flex;
  justify-content: space-around;
}
</style>
