const configIP = require('../proxy/configIP')
exports.getLatestVerInfo = async ctx => {
    let ip = ctx.request.ip;
    // 1.获得输入的白名单ip
    let stringIp = ctx.request.body.whiteList;
    // console.log(`stringIP:${stringIp}`, typeof stringIp);

    let whiteIP = stringIp.split(",");
    console.log(`whiteIP: ${whiteIP}`, typeof whiteIP);

    // // 2.检测请求的IP是否在设定的白名单上
    const isInWhitelist = await configIP.examineIpValidate(whiteIP, ip);

    // // 3.返回true/false
    ctx.body = isInWhitelist;
    if (!isInWhitelist) {
        ctx.body = "不在白名单上"
    } else {
        ctx.body = "在白名单上"
    }
};