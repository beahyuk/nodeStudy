<template>
  <div class="bg">
    <div class="login-wrap">
      <div class="title">O365认证共通化应用</div>
      <div class="content">
        <el-card class="box-card">
          <!-- 1.登陆注册按钮 -->
          <div class="nav">          
                <router-link to="/">登录</router-link>
                <router-link to="/Register">注册</router-link>
          </div>
          <!-- 2.表单 -->
          <div class="form">
            <el-form :label-position="labelPosition" label-width="80px" :model="formData">
              <el-form-item label="用户名：">
                <el-input v-model="formData.name" placeholder="Username"></el-input>
              </el-form-item>
              <el-form-item label="密码：">
                <el-input v-model="formData.password" type="password" placeholder="Password"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- 3. 两个button按钮 -->
          <div class="button">
              <el-button type="primary">登录</el-button>
              <el-button @click="toRegister">注册</el-button>
          </div>
        </el-card>
      </div>
    </div>
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
      }
    };
  },
  methods:{
    toRegister(){
      this.$router.replace("/register")
    }
  }
};
</script>

<style>
html body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.bg {
  background-image: url("../assets/background.png");
  height: 600px;
  width: 100%;
}
.bg .login-wrap {
  width: 100%;
  height: 300px;
  position: relative;
  margin: 0 auto;
  top: 50%;
  margin-top: -150px;
}
.title {
  color: white;
  font-size: 30px;
  padding: 20px;
  font-weight: bold;
  text-align: center;
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
.nav a.router-link-exact-active{
  padding-bottom: 5px;
  border: solid #3a62d7;
  border-width: 0 0 2px 0;
}
.box-card {
  width: 400px;
  height: 100%;
  margin: auto auto;
}
.box-card .form {
  padding: 10px;
}
.button  {
  text-align: center;
  display: flex;
  justify-content: space-around;
}
</style>