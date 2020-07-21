/**
 * 将数字转为16进制的字符串
 * @param {*} d 
 */
function d2h(d) {
    return d.toString(16)
}

/**
 * 将16进制数字转为10进制
 * @param {*} d 
 */
function h2d(d) {
    return parseInt(d, 16);
}

/**
 * 将ip转数字
 * @param {*} d 
 */
function dot2num(d) {
    var n = d.split(".");
    return 256 * (256 * (256 * +n[0] + +n[1]) + +n[2]) + +n[3]
}

/**
 * 将数字转ip字符串
 * @param {*} d 
 */
function num2dot(d) {
    for (var n = d % 256, t = 3; t > 0; t--) d = Math.floor(d / 256), n = d % 256 + "." + n;
    return n
}

/**
 * 转换函数
 * @param {*} d0 可以是ip字符串也可以是Ip数字
 */
function convert(d0) {
    let d = d0 + '';
    const n = /^(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])$/,
        t = /^\d+$/;
    d.match(n) ? d = dot2num(d) : d.match(t) && 4294967296 > +d && (d = num2dot(d));
    return d;
}

function dealIpsToDec(tmpIps, num = 0) {
    const rst = [];
    tmpIps.forEach(o => {
        const oTrim = o.trim(); // 去除首尾空格
        if (/\-/g.test(oTrim)) {
            const [minStr, maxStr] = oTrim.split('-');
            const [min, max] = [convert(minStr), convert(maxStr)];
            const tmpMax = num > 0 && max - min > num ? min + num : max; // 当区间特别大的时候进行处理
            for (let i = min; i <= tmpMax; i++) {
                rst.push(i);
            }
        } else {
            rst.push(convert(oTrim));
        }
    });
    const rstSorted = rst.sort();
    return rstSorted;
}

/**
 * 根据ip区间段生成指定数量的ip
 * @param {*} tmpIps ip区间段
 * @param {*} num 取几个数据
 * @param {*} usedIps 已使用的ip数组
 * @param {*} offSet 偏移量
 */
function generateIpBySort(tmpIps, num, usedIps = [], offSet = 0) {
    const usedIpL = usedIps.length; // 已使用ip数组长度
    const generateIpTotal = num + offSet + usedIpL; // 需要生成ip数组长度+ 偏移量 + 已使用ip长度
    const tmpDecArr0 = dealIpsToDec(tmpIps, generateIpTotal); // 生成ip数组
    const usedIpNum = []; // 已使用ip转化为十进制的数组
    usedIps.forEach(o => usedIpNum.push(convert(o + '')));
    /**
     * 剔除指定的ip
     */
    const tmpDecArr = tmpDecArr0.filter((item) => !(usedIpNum.some((i) => i == item)))

    const rstIps = [];
    const tmpDecArrL = tmpDecArr.length;
    if (tmpDecArrL > 0) {
        const tmpTotal = num + offSet > tmpDecArrL ? tmpDecArrL : num + offSet;
        for (let i = offSet; i < tmpTotal; i++) {
            rstIps.push(convert(tmpDecArr[i]))
        }
    }
    return rstIps;
}

/**
 * 校验ip是否在规定的ip区间段里面
 * @param {*} tmpIps 
 * @param {*} ip 
 * @rst {*} rstFlag 为true表示校验在合法区间，为false为非法IP
 */
function examineIpValidate(tmpIps, ip) {
    const ipTrim = ip.trim(); // 去除首尾空格
    const ipToDec = convert(ipTrim);
    let rstFlag = false;
    for (let o of tmpIps) {
        const oTrim = o.trim(); // 去除首尾空格
        if (/\-/g.test(oTrim)) {
            const [minStr, maxStr] = oTrim.split('-');
            const [min, max] = [convert(minStr), convert(maxStr)];
            if (min <= ipToDec && ipToDec <= max) {
                rstFlag = true;
                break;
            }
        } else {
            if (convert(oTrim) === ipToDec) {
                rstFlag = true;
                break;
            }
        }
    }
    console.log('***********====', rstFlag)
    return rstFlag;
}
const ipList = ["192.168.0.2-192.168.0.5", " 192.168.63.253"];
const ipListRet = generateIpBySort(ipList, 8, ['192.168.0.3']);
console.log(`**********生成指定数量的IP**********`);
console.log(`生成结果如下：${ipListRet}`);
const testArr = [" 192.168.0.38", "172.0.0.1-172.0.0.255", " 192.168.0.34"];
const testIp = ' 172.0.0.1';
console.log(`**********校验IP合法性**********`);
// console.log(`校验结果如下：${examineIpValidate(testArr, " 192.168.0.38")}`);
console.log(`校验结果如下：${examineIpValidate(testArr, testIp)}`);