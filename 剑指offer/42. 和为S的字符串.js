/* * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let start = 0;
    let end = nums.length - 1;
    let res = [];
    while (start < end) {
        let sum = nums[start] + nums[end];
        if (sum > target) {
            end--;
        } else if (sum < target) {
            start++;
        } else {
            res.push(nums[start], nums[end])
            break;
        }
    }
    return res
};
let arr = [2, 3, 11, 15];
let targetTest = 9;
let res = twoSum(arr, targetTest);
console.log(res);