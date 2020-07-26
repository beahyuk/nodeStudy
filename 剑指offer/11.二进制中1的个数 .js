// 整数转二进制，用toString方法
let a = 13;
let b = a.toString(16)

console.log(b);
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let str = n.toString(2).match(/1/g);
    return str ? str.length : 0
};
let res = hammingWeight(11);
// console.log(res)