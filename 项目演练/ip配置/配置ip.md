# IP配置

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