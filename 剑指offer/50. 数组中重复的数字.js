/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
    let s = new Set();
    for (let num of nums) {
        let curLen = s.size;
        s.add(num);
        if (s.size == curLen) {
            return num
        }
    }
};
let arr = [2, 3, 1, 0, 2, 5, 3];
let res = findRepeatNumber(arr);
console.log(res);