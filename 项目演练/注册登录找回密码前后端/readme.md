# 后端

## 项目需要的包

```shell
npm install express@next
npm install mongoose -S
npm install bcryptjs -S
npm install jsonwebtoken -S 
npm install --save body-parser
```

express@next

bcryptjs  密码加密

jsonwebtoken 生成和解析token

mongoose 数据库操作

body-parser  获得body的值

compare函数和compareSync 函数的区别

## sync同步函数

compare函数是异步函数

compareSync函数是同步函数

异步函数需要回调函数，同步不需要

## 跨越问题

运行本地前端项目时，想要访问nodejs的后端接口，报错，是跨越问题

app.js中要设置头部，在服务器端声明允许访问数据

```javascript
// 在路由设置前添加
// 设置跨越请求
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

```

# 前端

## 邮箱验证

邮箱验证 如果在data中写，就会一直显示 请输入正确的邮箱格式

借鉴验证手机号方法：<https://www.cnblogs.com/cckui/p/10349827.html>

```javascript
data(){
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
    return{
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
        }
    }
} 
methods:{
    checkEmail(str) {
      var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g;
      if (pattern.test(str)) {
        return true;
      } else {
        return false;
      }
    },
}
```

## 表单创建

### 父子组件通信

element UI的 表单进行封装,涉及到父子组件通信

当父组件传给子组件表单时,子组件需要改变form表单的值,这个时候 还要watch 监控 子组件填的form

参照文章:<https://juejin.im/entry/6844903599491776520>

 校验表单参照文章: <https://www.cnblogs.com/flypig666/p/11787152.html>	

### 父子组件 表单校验

- 注意点:prop校验名 要和 form数据名 相对应
- 在子组件定义validate方法，在父组件中调用
  - 参考文章：<https://blog.csdn.net/u013746071/article/details/102935299>