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
 */
function convert(ip) {
    // 在ip末尾加空格
    let res = ip + '';
    const n = /^(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])$/,
        t = /^\d+$/;
    res.match(n) ? res = dot2num(res) : res.match(t) && 4294967296 > +res && (res = num2dot(res));
    return res;
}
exports.examineIpValidate = async(tmpIps, ip) => {
    let pattern = /\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g;
    let tempIp = ip.match(pattern)[0];
    console.log(`ip:${tempIp}`)
    const ipTrim = tempIp.trim(); // 去除首尾空格
    const ipToDec = convert(ipTrim);
    let rstFlag = false;
    for (let o of tmpIps) {
        const oTrim = o.trim(); // 去除首尾空格
        // reg.test(str)查找匹配项，找到true，否则为false
        // 这里的正则是查找-的符号，255-1-255-3
        if (/\-/g.test(oTrim)) {
            const [minStr, maxStr] = oTrim.split('-');
            const [min, max] = [convert(minStr), convert(maxStr)];
            // console.log(`minIP:${min},maxIP:${max}`)
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
    return rstFlag;
}