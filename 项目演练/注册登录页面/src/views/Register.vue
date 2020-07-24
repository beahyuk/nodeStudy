<template>
  <div class="login-wrap">
    <h2>O365认证共通化应用</h2>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :rules="rules"
      ref="formData"
      :model="formData"
      class="login-form"
    >
      <!-- 1.登陆注册按钮 -->
      <div class="nav">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <!-- 2.表单 -->
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="formData.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="formData.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="Password"></el-input>
      </el-form-item>
      <!-- 3. 注册button按钮 -->
      <div class="button">
        <el-button type="primary" @click="handleReg('formData')">注册</el-button>
        <el-button @click="toLogin">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // var userEmail = (rule, value, callback) => {
    //   const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    //   if (!value) {
    //     return callback(new Error("邮箱不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (mailReg.test(value)) {
    //       callback();
    //     } else {
    //       callback(new Error("请输入正确的邮箱格式"));
    //     }
    //   }, 100);
    // };

    var validateEmail = (rule, value, callback) => {
      var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g;
      console.log(`邮箱是否正确：${pattern.test(value)}`);
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!this.checkEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
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
        email: "",
        username: "",
        password: "",
      },
      rules: {
        email: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
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
    handleReg(formName) {
      const email = this.formData.email;
      const username = this.formData.username;
      const password = this.formData.password;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log("邮箱/用户名/密码为空");
          return false;
        } else {
          console.log("axios请求");
          this.axios
            .post("http://172.25.73.71:3001/api/register", {
              email,
              username,
              password,
            })
            .then((res) => {
              console.log(res);
              if(res.data.status === 200){
                                this.$router.replace("/");
                this.$message.success(res.data.msg);

              }else{
              this.$message.warning(res.data.msg);
              }
            });
        }
      });
    },
    toLogin() {
      this.$router.replace("/login");
    },

    checkEmail(str) {
      var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g;
      if (pattern.test(str)) {
        return true;
      } else {
        return false;
      }
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
