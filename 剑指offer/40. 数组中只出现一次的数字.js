/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
    let mask = 0;
    for (let num of nums) {
        mask ^= num;
    }
    const diff = mask & -mask;
    let num1 = 0;
    for (let num of nums) {
        if (num & diff) {
            num1 ^= num
        }
    }
    const num2 = mask ^ num1;
    return [num1, num2]
};
let arr = [2, 1, 2, 4, 3, 3];
let res = singleNumbers(arr);
console.log(res);