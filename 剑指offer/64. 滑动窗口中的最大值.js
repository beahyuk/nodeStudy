/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let length = nums.length;
    let res = [];
    let max = 0;
    let temp = []; // 窗口临时双端队列
    if (!length) return [];
    for (let i = 0; i < length; i++) {
        if (temp.length < k) {
            temp.push(nums[i]);
        }
        if (temp.length == k) {
            max = Math.max(...temp); // 取出最大值
            res.push(max);
            temp.shift();
        }
    }
    return res;
};
let arr = [1, 3, -1, -3, 5, 3, 6, 7];
let kTemp = 3;
let res = maxSlidingWindow(arr, kTemp);
console.log(res);