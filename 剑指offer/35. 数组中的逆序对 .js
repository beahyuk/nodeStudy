/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {

    let res = { count: 0 }
    mergeSort(nums, res);
    return res.count
};

function mergeSort(arr, res) {
    if (arr.length < 2) return arr;
    let len = arr.length;
    let mid = Math.floor(len / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, len);
    return merge(mergeSort(left, res), mergeSort(right, res), res);
}

function merge(left, right, res) {
    let arrSort = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            arrSort.push(left.shift()) // 一定要记住:第二次遍历的时候,left[0]是原来第二个数和右边第一个比
        } else {
            // 归并排序唯一添加的一行代码
            // 如果是添加右边数组的元素,证明左边剩余元素都能和(右边添加的数)组成逆序对
            // 例如[3,5,7] ,[1,2] 遍历到1的时候,左边的[3,5,7]都能和1组成逆序对
            res.count += left.length;
            arrSort.push(right.shift()) // 第二次遍历的时候,右边第二个1再和3比较,则再加左边的长度
        }
    }
    // 循环结束后,left为空,则把剩余的right加入.或者 right为空,把left加入
    // console.log(arrSort);
    return arrSort.concat(left, right)
}

let arrTest = [7, 5, 6, 4];
let result = reversePairs(arrTest);
console.log(result);