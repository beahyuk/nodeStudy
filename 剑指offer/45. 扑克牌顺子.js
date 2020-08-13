/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
    if (nums.length == 0 || nums.length > 5) return false;
    let zeroNum = 0,
        diff = 0;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] == 0) {
            zeroNum++;
        } else {
            if (nums[i] == nums[i + 1]) {
                return false;
            } else {
                diff += nums[i + 1] - nums[i] - 1;
            }
        }
    }
    return diff <= zeroNum ? true : false;
};
let arr = [9, 10, 4, 0, 9];
let res = isStraight(arr);
console.log(res);