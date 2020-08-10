/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (!nums.length) return 0;
    let start = getStart(nums, target);
    let end = getEnd(nums, target);
    return start <= end && start != -1 ? end - start + 1 : 0;
};

function getStart(nums, target) {
    let [left, right] = [0, nums.length - 1];
    let start = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            start = mid;
            right = mid - 1; // 向左二分查找
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return start
}

function getEnd(nums, target) {
    let [left, right] = [0, nums.length - 1];
    let end = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            end = mid;
            left = mid + 1; //向右二分查找
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return end;
}

let arr = [1, 2, 3, 3, 3, 3, 4, 5]
let target = 3;
let res = search(arr, target);
console.log(res);