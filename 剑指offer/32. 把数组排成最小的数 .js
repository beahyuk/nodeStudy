/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    let res = nums.sort((a, b) => ('' + a + b) - ('' + b + a)).join('')
    return res
};
let arr = [3, 32, 321];
let result = minNumber(arr);
console.log(result);