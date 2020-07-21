/**
 * 将ip字符串转为数字
 * @param {*} ip 255.255.255.255
 * @return 数字
 */
function dot2num(ip) {
    var n = ip.split(".");
    return 256 * (256 * (256 * +n[0] + +n[1]) + +n[2]) + +n[3]
}

/**
 * 将数字转ip字符串
 * @param {*} ip  
 * @return ip字符串 255.255.255.2
 */
function num2dot(ip) {
    for (var n = ip % 256, t = 3; t > 0; t--) ip = Math.floor(ip / 256), n = ip % 256 + "." + n;
    return n
}

/**
 * 转换函数
 * @param {*} ip 可以是ip字符串也可以是Ip数字
 *  检验ip是字符串还是ip数字
 *  如果是字符串，就转数字
 *  否则 数字 转 ip字符串
 */
function convert(ip) {
    // 在ip末尾加空格
    let res = ip + '';
    const n = /^(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])$/,
        t = /^\d+$/;
    // 如果res.match(n)也就是参数ip是字符串255.255.1.2形式的，则返回res= dot2num(res),转成数字
    // 否则，执行：右边的运算。
    // 多个与操作符&&，如果全为true，则返回最后一个操作数 res = num2dot(res)，将数字转成字符串
    // 与操作符返回第一个假值，没有假值返回最后一个数
    res.match(n) ? res = dot2num(res) : res.match(t) && 4294967296 > +res && (res = num2dot(res));
    return res;
}

function examineIpValidate(tmpIps, ip) {
    const ipTrim = ip.trim(); // 去除首尾空格
    const ipToDec = convert(ipTrim);
    let rstFlag = false;
    for (let o of tmpIps) {
        const oTrim = o.trim(); // 去除首尾空格
        // reg.test(str)查找匹配项，找到true，否则为false
        // 这里的正则是查找-的符号，255-1-255-3
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


// var pattern = /\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g,
//     str = 'ip:::ffff:255.25.78.2';
// console.log(str.match(pattern));

let arrIps = ["255.25.1.1-255.25.78.255", "172.0.0.1-172.25.78.255", " 192.168.0.34"];
let temp = convert("172.0.0.1".trim());
console.log(`IP:${temp}`)
let arrIP = "192.168.0.7-193.168.0.67";
// let res = /\-/g.test(arrIP)
const [minS, maxS] = arrIP.split('-');
const [min, max] = [convert(minS), convert(maxS)];
console.log(`minIP:${min},maxIP:${max}`)