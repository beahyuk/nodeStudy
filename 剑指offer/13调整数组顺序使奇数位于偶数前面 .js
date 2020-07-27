/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
    const odd = [], //奇数数组
        arr = []; //偶数数组
    nums.forEach(item => {
        item % 2 ? odd.push(item) : arr.push(item)
    })
    return odd.concat(arr)
};
const res = exchange([1, 2, 3, 4]);
console.log(res)