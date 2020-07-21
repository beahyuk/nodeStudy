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

