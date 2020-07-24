# IP配置

## 代码编写

```javascript
const ipList = ["192.168.0.2-192.168.0.5", " 192.168.63.253"];
const ipListRet = generateIpBySort(ipList, 8, ['192.168.0.3']);
console.log(`**********生成指定数量的IP**********`);
console.log(`生成结果如下：${ipListRet}`);
const testArr = [" 192.168.0.38", "192.168.0.7-193.168.0.67", " 192.168.0.34"];
const testIp = ' 192.168.0.38';
console.log(`**********校验IP合法性**********`);
console.log(`校验结果如下：${examineIpValidate(testArr, " 192.168.0.38")}`);
```

`generateIpBySort(ip区间段，取几个数据，已使用的ip数组，偏移量)` 返回的是**生成指定数量的IP**

`examineIpValidate(检测ip数组，检测的ip) ` 返回的是  **true或者false** true表示校验在合法区间，false为非法IP



`convert()` 函数 接收的是ip字符串 或者ip数字

`regexp.test(str)` 查找匹配项，有true，没有false

```javascript
let str = "I love JavaScript";
console.log(/love/i.test(str)); //true

```

`str.match(reg)` 方法在字符串`str`中找到匹配 `reg`的字符 `reg`是正则表达

```javascript
let str = "i love coderXue";
let res = str.match(/o/g);
console.log(res)
// [ 'o', 'o' ]
```

条件运算符 ‘?’

```javascript
let res = 1 > 2 ? true : false
console.log(res)
// false
```

与操作符&&

```javascript
let res = 3 > 2 && 4 > 3 && 2 > 1
console.log(res)
// true
```

与运算`&&`做了如下的事：

- 从左到右依次计算操作数
- 将处理每一个操作数时，都将其转化为布尔值，如果结果是`false`，就停止计算，并返回这个操作数的初始值
- 如果所有的操作数都被计算过（也就是，转换结果都是`true`），则返回最后一个操作数

换句话说，与运算符 返回第一个假值，如果没有假值则返回最后一个值

```javascript
let a = 55;
let res = 3 > 2 && 4 > 3 && (a = a - 1)
console.log(res)
// 54
```

### IP正则表达式匹配

```javascript
app.get('/',ctx=>{
    // 获得请求的ip地址
    let ip = ctx.request.ip; 
})
```

```shell
#得到的样式
ip:::fff:172.25.78.168
```

要得到IP的地址，用正则表达式匹配

```javascript
var pattern = /\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g,
    str = 'ip:::ffff:172.25.78.2';
console.log(str.match(pattern));
// 172.25.78.2
```

正则表达式参考：<https://tool.lu/regex/>



## 错误情况考虑

| 错误情况                                    | 返回  | 举例                                                         | 备注                                                 |
| ------------------------------------------- | ----- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 白名单为空                                  | false | whiteIP=[]                                                   |                                                      |
| 区间右边为空                                | false | whiteIP=["255.91.25.1-"]                                     | 空的为0，ip<0不成立                                  |
| 区间左边为空                                | true  | whiteIP=["-255.91.25.1"]  whiteIP=["127.0.0.1",”-255.91.25.1"] | 空的为0，ip>0成立。只要小于max的都是返回true         |
| ip格式错误1：没有区间，只有三段ip           | false | whiteIP=["255.5.79"]                                         | ip格式错误的，convert(ip)后无法进行数据的转化        |
| ip格式错误2：多个区间，有一个区间的格式不对 | true  | whiteIP=['255.1.2-255.2.2', '255.25.78.2-255.25.78.255'];    |                                                      |
| ip格式错误3：区间，ip只有三段和右边         | false | whiteIP=["-255.5.79"]                                        |                                                      |
| ip格式错误4：区间，ip只有三段和左边         | false | whiteIP=["255.5.79-"]                                        |                                                      |
| **区间连接符不是“-”，是“~”，或其他**        | false | whiteIP=["255.5.79.1~255.5.79.2"]                            | **固定白名单ip的格式**，表示区间的~算错误            |
| 区间重叠                                    | true  | whiteIP=['255.25.78.254-255.25.78.255', '255.25.78.253-255.25.78.255', '255.25.78.1-255.25.78.255'] | 一个个区间查询，如果在就返回true，不在就继续往下比较 |
| 区间ip过多，检测时间很久                    |       |                                                              |                                                      |

错误情况是返回false 还是返回提示消息

1. 如果白名单格式设定错误，需要服务器发出报错消息？

2. 需要超时设定？

   如果检测是否在白名单 花费时间太久，超时后，是返回结果为   false，不显示新版本消息，还是显示lastestVer

```javascript
var now = new Date();
var finishTime = now+setTime // 规定结束时间
while(true){
   try{
       // 逻辑处理，如果符合，return 结果
   } catch(ignored){
       // exception，错误提示
   }
    now = new Date();
    if(now.getTime() > finishTime){
        return "超时"
    }
}
```

## 代码运行

配置的白名单IP：  whiteIP: ["172.25.1.1-172.25.78.255", "127.0.0.1-127.25.78.255", " 192.168.0.34"],

获得ip 地址：     :::ffff:172.25.73.71    需要进行正则提取ip地址

需要校验的ip： 2887338311

min ：2887319809

max：2887339775



![1595401104909](C:\Users\xueqing\AppData\Roaming\Typora\typora-user-images\1595401104909.png)

## ip接收IPv4地址

### 修改入口文件

在koa2的入口文件bin/www中，可以找到：

```javascript
server.listen(port);
```

hostman 参数被省略，则使用默认值“::”。服务器将会在IPv6可用时接受任何IPv6地址上的连接。如果想要设置为接受IPv4地址，则使用参数'0.0.0.0',即：

```javascript
server.listen(port,'0.0.0.0');
```

值得一提，若省略port参数，或使用端口值为0，则会让操作系统分配一个随机端口，这时可以使用server.address().post在'listening'事件发出后检索实际使用的端口：

```javascript
server.on('listening',function(){
    // server.address().port
})
```

