/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function(str) {
    let strTrim = str.trim().replace(/ /g, '');
    let flag = 1,
        res = 0,
        int_min = Math.pow(2, 31) * -1,
        init_max = Math.pow(2, 31) - 1;
    if (!strTrim.length) return 0;

    if (strTrim[0] == '-') {
        flag = -1
    }
    for (let i = strTrim[0] == '+' || strTrim[0] == '-' ? 1 : 0; i < strTrim.length; i++) {
        if (!(strTrim[i] >= '0' && strTrim[i] <= '9')) break;
        res = (res << 1) + (res << 3) + (strTrim[i] - '0')
    }
    return res * flag
};
var strToInt = function(str) {
    let res = str.match(/^\s*[+-]?\d+/);
    if (!res) return 0;

    res = str.match(/^\s*[+-]?\d+/)[0].trim();
    if (res >= Math.pow(2, 31)) {
        return Math.pow(2, 31) - 1;
    } else if (res <= Math.pow(-2, 31)) {
        return Math.pow(-2, 31);
    } else {
        return res;
    }
}
let s = "-91283472332";
let res = strToInt(s);
console.log(res);