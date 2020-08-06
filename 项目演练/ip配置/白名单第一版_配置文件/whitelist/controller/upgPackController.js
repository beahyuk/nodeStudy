const configIP = require('../proxy/configIP')
exports.getLatestVerInfo = async ctx => {
    // let ip = ctx.request.ip;
    let testIps = ["255.25.1.1-255.25.78.255", "172.0.0.1-172.25.78.255", " 192.168.0.34"];
    const testIp = ' 172.0.0.1';
    const resIP = await configIP.examineIpValidate(testIps, testIp);
    // resIP 应该是 true 或者 false 表示是否在白名单上
    console.log(`resIP:${resIP}\n`)
    if (!resIP) {
        console.log("测试1")
    } else {
        console.log("测试2")
    }
};