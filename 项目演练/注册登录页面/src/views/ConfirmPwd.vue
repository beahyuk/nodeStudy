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
      <div class="content">    <span>邮件已发送,请查看 </span>
      <!-- <span>查看</span> -->
      </div>
  
      <div class="btn" style="text-align:center ">
        <el-button  type="primary" @click="toLogin">查看</el-button>
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
          // this.$router.replace("/login");

    },
     goToEmailLogin (email) {
        var hash = {
            'qq.com': 'http://mail.qq.com',
            'gmail.com': 'http://mail.google.com',
            'sina.com': 'http://mail.sina.com.cn',
            '163.com': 'http://mail.163.com',
            '126.com': 'http://mail.126.com',
            'yeah.net': 'http://www.yeah.net/',
            'sohu.com': 'http://mail.sohu.com/',
            'tom.com': 'http://mail.tom.com/',
            'sogou.com': 'http://mail.sogou.com/',
            '139.com': 'http://mail.10086.cn/',
            'hotmail.com': 'http://www.hotmail.com',
            'live.com': 'http://login.live.com/',
            'live.cn': 'http://login.live.cn/',
            'live.com.cn': 'http://login.live.com.cn',
            '189.com': 'http://webmail16.189.cn/webmail/',
            'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
            'yahoo.cn': 'http://mail.cn.yahoo.com/',
            'eyou.com': 'http://www.eyou.com/',
            '21cn.com': 'http://mail.21cn.com/',
            '188.com': 'http://www.188.com/',
            'foxmail.com': 'http://www.foxmail.com',
            'outlook.com': 'http://www.outlook.com'
        }

        var _email = email.split('@')[1];    //获取邮箱域
        if(hash.hasOwnProperty(_email)){
            location.href=hash[_email];
        }else{
            alert("抱歉!未找到对应的邮箱登录地址，请自己登录邮箱查看邮件！");
        }
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
.content{
  text-align: center;
  padding: 10px;
}
.btn{
  padding-top: 30px;
}
</style>
