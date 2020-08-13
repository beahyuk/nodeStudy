// let a = [1, 2, 3];
// let res = a.reduce((sum, current) => sum + current, 0);
// console.log(res);
/**
 * @param {number} n
 * @return {number}
 */
var sumNums = function(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = i + 1;
    }
    let total = arr.reduce((sum, current) => sum + current, 0);
    return total
};
var sumNums = function(n) {
    return n > 1 ? n && sumNums(n - 1) + n : 1
};
let num = 3;
let res = sumNums(num);
console.log(res);