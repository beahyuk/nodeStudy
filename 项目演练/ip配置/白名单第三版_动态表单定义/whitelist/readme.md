# 后端

## 跨域解决

因为用的是koa框架，所以介绍koa框架的跨域

1. 安装koa2-cors

   ```shell
   npm install --save koa2-cors
   ```

2. 引入koa2-cors 并且配置中间件

   ```javascript
   var Koa = require('koa');
   var cors = require ('koa2-cors');
   
   var app = new Koa();
   app.use(cors());
   ```

## req.request.body接收问题

```javascript
let params = req.request.body; //params是一个对象
let whitelist = params.whitelist //调用params里的whitelist属性，得到的是字符串，而不是数组格式
```

## MongoDB

思路，在数据库中加入参数，看返回的值

或者 将传来的字符串 改成 数组

## 字符串转数组

### 数组转字符串

需要将数组元素用某个字符连接成字符串，示例代码如下：

```javascript
var a, b;
a = new Array(0, 1, 2, 3, 4);
b = a.join('')
console.log(b, typeof b); //01234 string
```

### 字符串转数组

实现方法是将字符串按某个字符切割成若干个字符串，并以数组形式返回，示例代码如下：

```javascript
var string = "127.0.1-125.035,37,65,11";
var arr = string.split(",");
console.log(arr, typeof arr); //[ '127.0.1-125.035', '37', '65', '11' ] 'object'
```

# 前端

## parcel-单vue文件

使用单独的打包工具  parcel：<https://zh.parceljs.org/getting_started.html>

项目运行：`parcel index.html`

新建单个vue文件构建页面，到时再集成

注意：每npm一个包，例如蚂蚁组件，axios，就要重启项目，否则会报错

## 完整项目运行

进入前端界面的步骤：

1.后端项目也要跑起来才能正常重置账号
2.在前端文件dev.config.js修改指向后端的 端口
const target = DevConf.Local;
3.前端 项目跑起来：npm run dev
4.跑起来后把网址后面的login 替换成 init ，根据要求重置账号
5.登录，初始密码：六个一

## 项目思路

思路：

1. 先就简单的输入框，验证发出的参数，能否作为白名单

2. 多个输入框，合并形成白名单

- 动态表单，获取里面值,然后依次遍历，获得表单的值
- ​	`whitelist  += value + ","`
- 后续：ant-design 组件自带的动态表单，可以返回数组

## 优化

- 网络请求 async/await 实现
- 区间输入框实现 区间段  
  - --未完成，难度有点高，不仅要input组件合并，也要实时的修改v-decorator的值
- 有+号 添加多个输入框  
  - --已完成 ，Ant-Design 自带组件
- 点击添加白名单，跳出卡片 进行选择
  - 添加到原项目的弹窗中
- input框 给格式提示
  - 已完成，ant-design自带校验规则

## 界面优化

- modal 里默认自带一个白名单+输入框

  - 已完成，不是默认自带一个白名单和输入框
  - 前端：如果没有点击添加ip区间按钮，就默认为空数组.在提交函数中,将"0.0.0.0-255.255.255.255"push到whiteList数组中,这样数据库中就有数据了
  - 后端:数据库中的whitelist就是全部了

- 删除按钮可以删除第一个元素
  - 已完成,，这样就可以不想创建的时候，可以删除已添加的输入框。
  - 当把设定的输入框全删除后,使用默认的数据库中的ip区间

- 添加按钮放在输入框的后面和del一样 或者 按钮的放置的位置改变

  - 已完成，把add的form-item加了v-bind=“没有标签的布局栅栏”

- index界面的ip一条一条显示已选择的IP区间

  - 已完成,因为whitelist是数组形式,用div标签,块级元素,做v-for循环,循环数据是data.whitelist

  - ```vue
    <div v-for="item in data.whiteList" :key="item">
      {{item}}
    </div>
    ```

    

## IP校验

```javascript
var pattern = /(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\-?)\,?)/g,
	str = '';
console.log(pattern.test(str));
```

正则匹配情况说明

- 标准：`172.25.73.71-172.25.73.255,172.25.78.168`
  - 全匹配
- `172.25.73.71-`
  - 全匹配
  - 匹配结果：`172.25.73.71-`
- `172.25.73.71,`
  - 全匹配
  - 匹配结果：`172.25.73.71,`
- `-172.25.73.71`
  - 只匹配ip
  - 匹配结果：`172.25.73.71`
- `,172.25.73.71`
  - 只匹配ip
  - 匹配结果：`172.25.73.71`

项目输入框情况：（应该是test）

| 输入ip                                                       | 结果               | 备注                                                         |
| ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| abc/你好/!@#                                                 | 请输入正确格式的ip | 纯字母/汉字/符号出错   <br />中文符号，英文符号，除了.,      |
| 127.0.0.1你好 / 127.0.0.1hello /127.0.0.1!@                  | 请输入正确格式的ip | ip带汉字/字母/符号 出错                                      |
| hello127.0.0.1 / 你好127.0.0.1 / !@127.0.0.1                 | 请输入正确格式的ip | 汉字/字母/符号带ip出错                                       |
| 172.25.73.71-172.25.73.255,127.0.0.1,172.25.25.25-172.25.25.255 |                    | 正确格式。可以有多个区间段和单个ip                           |
| 172.25.73.71-                                                |                    | **虽然前端没检测出来**，但是ip落到这个ip区间段，后端返回false |
| 172.25.73.71,                                                |                    | 正确，请求ip是这个白名单ip，后端返回true                     |
| ,172.25.73.71                                                | 请输入正确格式的ip | 英文,开头，提示输入格式错误                                  |
| -172.25.73.71                                                | 请输入正确格式的ip | 连接符-开头，提示输入格式错误                                |
| 127.0.0.1-127.0.0                                            | 请输入正确格式的ip | 右边ip格式错误                                               |
| 127.0.0-127.0.0.255                                          | 请输入正确格式的ip | 左边ip格式错误                                               |
| 127.0.0.1-127.0.0.255,127.0.0                                | 请输入正确格式的ip | 其他ip区间段正确，单个ip格式错误，也会提示。                 |
| 127.0.0.1-127.0.0.255,127.0.0-127.0.0.255                    | 请输入正确格式的ip | 其他ip区间段正确，某个ip区间段错误，也会提示。               |
| 127.25.25.1-127.25.25.2-127.25.25.3                          |                    | **虽然无提示**，但是区间段默认为127.25.25.1-127.25.25.2      |



## 项目问题

- 后端的问题：传入参数的时候不是作为数组传入的，而是字符串

  - --已解决，split

  ```javascript
  let stringIp = ctx.request.body.whiteList;
  let whiteIP = stringIp.split(",");
  
  // 数组转字符串
  // var a, b;
  // a = new Array(0, 1, 2, 3, 4);
  // b = a.join('')
  // console.log(b, typeof b);
  
  // 字符串转数组
  var string = "127.0.1-125.035,37,65,11";
  var arr = string.split(",");
  console.log(arr, typeof arr);
  ```

  ​	后续：由于前端换了组件，传回的参数已经是数组形式，所以不需要了

- 前端传入的参数 后端显示 undefined 

  - --已解决，是传参的时候没有写 键名，直接ip

- 解决 runtime-only 问题

  报错信息：You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

  解决方案：引入vue，不要直接vue，引入vue/dist/vue.js

  在index.js文件

  ```javascript
  import Vue from "vue/dist/vue.js";
  import App from "./modal.vue"
  ```

- 我前端输入框输入的是字符串。应该在前端进行转换 还是 后端进行转化成数组？

- 为什么点弹窗的确定 不关闭了呢

  - 已解决：submit方法错误，所以无法关闭
  - 已已解决：是cmd卡住，无法实时运行服务器

- Vue warn]: Error in v-on handler (Promise/async): "TypeError: Cannot read property 'status' of undefined"，点表单确定后出错

  - 后端cmd卡住了，没有实时运行服务器

- postman 发起post请求，出现404状态，导致无法检测是否在白名单里

  - 请求的url错误，无语 ，找了一个多小时的bug
  - http://172.25.73.71:3000/upgPack/getLatestVerInfo
  - 因为小项目是直接的http://127.0.0.1:3000/getLatestVerInfo，所以还默认就是这个呢

- postman能打印whitelist，但是还是not found 404状态

  - 未解决
  - 但是可以通过log打印出结果
  
- 算法:根据白名单,输出keys数组,给定一个n,输出从0到n-1的数组

  - ```javascript
    let arr = [];
    let arrb = [0, 1, 3];
    arr = Array.from({ length: arrb.length }, (item, index) => index);
    console.log(arr);//[0,1,2]
    ```

- 算法: 根据白名单,将字符串数组,转成对象数组并给定key

  ```JavaScript
   let arr = ["1.0", "23.2"];
   arr = arr.map((item, index) => item = { 'value': item, 'key': index + 1 });
   console.log(arr);
  ```

- 算法:提取数组对象中的 value 值

  ```javascript
  let arr = [{ value: '1.0', key: 1 }, { value: '23.2', key: 2 }];
  arr = arr.map(item => item.value);
  console.log(arr);
  ```

  

## AntDesign问题

- button里面，文字无法放在icon后面，只能放前面

  - 解决方案：写全<a-icon>标签

    ```javascript
     <a-icon type="plus" ></a-icon> 添加
    ```

- 每条输入框的删除icon无法显示

  - 解决方案 ：`a-input`标签写结束标签`</a-input>` 而不是单标签`<a-input />` 
  - 结果：删除icon就会显示了
  
- 对输入的内容进行正则校验

  - ant-design自带校验方法，不必像elementUI写回调函数

  - 在rules中直接写正则，注意不要加引号

    ```javascript
      ValidateRules:{
        whiteIP: {
          rules: [
            { required: true, message: "请输入白名单" },
            { pattern:/((\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}\-?)\,?)/g,
              message:"请输入正确格式的ip"
            }
            ],
        },
      }
    ```

  - 在标签中调用这个rule

    ```html
     <a-form-item label="升级白名单："  v-bind="formItemLayout" >
       <a-input v-decorator="['whiteList', ValidateRules.whiteIP]" />
    </a-form-item>
    ```
  
- input校验警告太多，想隐藏警告。async-validator

  - 虽然不建议修改node_modules的文件，但是还是给注释掉。所以node_modules删除后在install后记得再重新注释
  - 1.找到util.js
    - node_modules -> async-validator -> es -> util.js
    - 将console.warn(type, errors)注释
  - 2.如果没找到util.js
    - node_modules -> async-validator -> dist-node 与 dist-web -> index.js
    - 将console.warn(type, errors)注释
  
- 需求：input输入框有一个默认值，不是placeholder

  - 加一个`initialValue:"0.0.0.0-255.255.255.255"`

  ```javas
   whiteIP: {
        initialValue:"0.0.0.0-255.255.255.255",
        rules: [
          { required: true, message: "请输入升级白名单" },
          { pattern:/^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\-?)\,?)*$/g,
            message:"请输入正确格式的ip"
          }
          ],
      },
  ```

- 代码集成在modal中，add按钮不起作用

  - form要在beforecreate（）创建，然后把data里的form给注释掉
  - 可能是这个原因，回头在实践一下
  - 毕竟原项目的form 是在 data里面，还要看怎么转换
  
- 动态表单怎么赋值 初始值? 当你设定了ip区间段后,再次编辑时,可以看到之前的设定

  - 网上解决方法:<https://www.freesion.com/article/5893520092/>
  - 解决方案二:<https://blog.csdn.net/hshshshs_/article/details/106572729>
  - 未解决,使用动态绑定方法
  
- 动态表单校验方法

  - 无语字,只有`a-form-model-item`才可以进行表单验证和绑定.找了将近一个小时的错误

  - 更加无语,新增动态的校验方法不管用,是因为from-item 添加了个:required=false 属性

  - 注意的是 在**form标签 中绑定** 对象数据

    ```html
    <a-form-model :form="form" :model="dynamicValidateForm" >
     </a-form-model>
    //数据格式 data的return返回
    dynamicValidateForm: {
            white2list: [],
    },
    ```

## Vue 问题

- 父子组件通信时，父组件向子组件传值，报错

  - 子组件不可以修改props里的值，只能调用。

  - 如果要修改，麻烦$emit一下，让父组件修改

  - ```vue
    // 父组件
    <popup :show="showpopup" @closepop="closepop"></popup>
     
    // 子组件
    <template>
      <div :class="show?'container show':'hide'" @click="close">   
      </div>
    </template>
     
    //这是一个弹窗
     
    <script>
        export default {
            name: "popup",
            props:{
              show:true,
            },  
            methods:{
              close(){
                //this.show = false;  //这行去掉 不能直接改变props中参数的值
                this.$emit('closepop'); //通知父组件改变。
              }
            }
        }
    </script>
    ```

- [Vue warn]: Error in created hook: "ReferenceError: regeneratorRuntime is not defined"

  - 这是因为用了 async/awit方法，浏览器无法识别ES7

  - 解决方案：安装一个转换包，把ES7 转到ES5,

    步骤一：安装包

    ```shell
    npm install babel-plugin-transform-runtime --save
    ```

    步骤二：`.babelrc`文件中增加`"transform-runtime"`

  - 简书解决方案<https://www.jianshu.com/p/d115ecefed50>
  
  - 未解决，需要添加`.babelrc`文件，不知道parcel能否正确打包。试了半小时不行，放弃

# 注意点

记得把 ip白名单 加入数据库

驱动管理后端数据库加 
E:\workspace\工作\驱动管理\driver_backend\models\Strategy.js

# 动态表单测试

| 测试情况                                 | 结果                                  | 备注               |
| ---------------------------------------- | ------------------------------------- | ------------------ |
| 1.不添加白名单时                         | 返回初始值 0-255                      |                    |
| 2.添加单个白名单/多个白名单              | 正常显示已输入的数据                  |                    |
| 3.删除所有输入框点确定                   | 返回初始值 0-255                      | 和1相似            |
| 4.添加单个空白 输入框/连续多个空白输入框 | 会过滤到空白输入框,回到初始值0-255    | 是在js中做数组过滤 |
| 5. 中间 有空白输入框                     | 会过滤到空白输入框,返回其他输入框的值 |                    |

