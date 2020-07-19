<template>
  <div class="login-wrap">
    <h2>O365认证共通化应用</h2>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formData"
      class="login-form"
    >
      <!-- 1.登陆注册按钮 -->
      <div class="nav">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <!-- 2.表单 -->
      <el-form-item label="邮箱：">
        <el-input v-model="formData.email" placeholder="Email"></el-input>
      </el-form-item>
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
      <!-- 3. 注册button按钮 -->
      <div class="button">
        <el-button type="primary" @click.prevent="handleReg()">注册</el-button>
        <el-button @click="toLogin">登录</el-button>
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
        email: "",
        name: "",
        password: "",
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.replace("/login");
    },
    async handleReg(){
      const res = await this.axios.post("http://localhost:3000/users", {
          params: {
            email: this.formData.email,
            name: this.formData.name,
          },
        });
        console.log(res)
    },
  },
};
</script>

<style>
.login-wrap {
  background-image: url("../assets/background.png");
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-wrap h2 {
  text-align: center;
  color: #fff;
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
  padding: 0 15px 5px 15px;
  border: solid #3a62d7;
  border-width: 0 0 2px 0;
}

.button {
  text-align: center;
  display: flex;
  justify-content: space-around;
}
</style>
