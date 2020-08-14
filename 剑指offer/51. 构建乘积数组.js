/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    // 先乘这个数的左边,再乘这个数的右边,最后相乘,避免当前数
    let b = [];
    let len = a.length;
    // p代表前i个a[i]的乘积
    for (let i = 0, p = 1; i < len; i++) {
        b[i] = p;
        p *= a[i];
    }
    // p代表后i个a[i]的乘积
    for (let i = len - 1, p = 1; i >= 0; i--) {
        b[i] *= p;
        p *= a[i];
    }
    return b
};
let arr = [1, 2, 3, 4, 5];
let res = constructArr(arr);
console.log(res);