/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if (!nums.length) return 0;
    let sum = nums[0];
    let maxSum = nums[0];
    // 因为sum和maxSum都是取第一个数，所以循环从1开始
    for (let i = 1; i < nums.length; i++) {
        let cur = nums[i]
        sum = Math.max(sum + cur, cur);
        maxSum = Math.max(sum, maxSum);
    }
    return maxSum;
};
// let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// let res = maxSubArray(arr);
// console.log(res);

var maxSubStr = function(nums) {
    if (!nums.length) return 0;
    let sum = nums[0];
    let maxSum = nums[0];
    let start = 0,
        end = 0;
    let first = 0,
        last = 0;

    // 因为sum和maxSum都是取第一个数，所以循环从1开始
    for (let i = 1; i < nums.length; i++) {
        let cur = nums[i]
        if (sum + cur >= cur) {
            sum = sum + cur
            end++
        } else {
            sum = cur
            start = i;
            end = i;
        };
        if (sum >= maxSum) {
            maxSum = sum
            first = start;
            last = end;
        }
    }
    return { maxSum: maxSum, subArr: nums.slice(first, last + 1) };
};
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
let res = maxSubStr(arr);
console.log(res);