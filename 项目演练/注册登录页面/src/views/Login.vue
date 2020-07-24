<template>
  <div class="login-wrap">
    <h2>O365认证共通化应用</h2>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      ref="formData"
      :rules="rules"
      :model="formData"
      class="login-form"
    >
      <div class="nav">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="formData.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="Password"></el-input>
      </el-form-item>
      <div class="button">
        <el-button type="primary" @click="handleLogin('formData')">登录</el-button>
        <el-button @click="toRegister">注册</el-button>
      </div>
      <el-link type="primary" @click="toPassword">忘记密码？</el-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
  
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePass,

            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleLogin(formName) {
      const username = this.formData.username;
      const password = this.formData.password;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log("用户名/密码为空");
          return false;
        } else {
          console.log("axios请求");
          this.axios
            .post("http://172.25.73.71:3001/api/login", {
              username,
              password,
            })
            .then((res) => {
              console.log(res);
              if (res.data.status === 200) {
                this.$router.replace("/");
                this.$message.success(res.data.msg);
              } else {
                this.$message.warning(res.data.msg);
              }
            });
        }
      });
    },
    toRegister() {
      this.$router.replace("/register");
    },
    toPassword() {
      this.$router.replace("/password");
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

.button {
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
}
</style>
