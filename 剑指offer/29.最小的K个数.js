/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
    arr.sort(function(a, b) { return a - b });
    return arr.splice(0, k)
};

function swap(i, j, arr) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function midnum(left, right, arr) {
    // 1.求出中间值
    let mid = Math.floor((left + right) / 2);
    console.log(`mid:${mid}`);
    // 2.判断并且进行交换
    if (arr[left] > arr[mid]) {
        swap(left, mid, arr);
    }
    if (arr[mid] > arr[right]) {
        swap(mid, right, arr);
    }
    if (arr[left] > arr[right]) {
        swap(left, right, arr)
    }
    // 3.巧妙的操作: 将center移动到right - 1的位置.
    swap(mid, right - 1);
    // 4.返回pivot枢纽
    return arr[right - 1]
}

function quickSort(left, right, arr) {
    if (left >= right) return;
    // let pivot = midnum(left, right);
    let pivot = arr[left];
    let i = left;
    let j = right;
    while (i < j) {
        while (arr[i] <= pivot && i < j) { i++ }
        while (arr[j] > pivot && i < j) { j-- }
        // if (i < j) {
        //     // swap(i, j, arr);
        //     let temp = arr[i];
        //     arr[i] = arr[j];
        //     arr[j] = temp;
        // }
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    // swap(i, right - 1);
    arr[left] = arr[i];
    arr[i] = pivot;
    quickSort(left, i - 1, arr);
    quickSort(i + 1, right, arr);
}