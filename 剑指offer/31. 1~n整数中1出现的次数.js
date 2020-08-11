/**
 * @param {number} n
 * @return {number}
 */
function countDigitOne(n) {
    //处理输入数字n，将其每一位按照从高位到低位放入数组arr
    let arr = String(n).split('');
    let len = arr.length
        //初始化参数
    let sumOfOne = 0; //记录1的个数
    let preNum = 0; //记录当前处理数位的之前的数字
    let postNum = 0; //记录当前处理数位之后的数字
    //初始化postNum
    for (let i = 1; i < len; i++) {
        postNum = postNum * 10 + arr[i] * 1;
    }
    //遍历所有数位
    for (let i = 0; i < len; i++) {
        if (arr[i] > 1) { //当前数位上的数字大于1的情况
            sumOfOne = sumOfOne + (preNum + 1) * Math.pow(10, len - 1 - i);
        } else if (arr[i] == 1) { //当前数位上的数字等于1的情况
            sumOfOne = sumOfOne + preNum * Math.pow(10, len - 1 - i) + postNum + 1;
        } else { //当前数位上的数字小于1的情况
            sumOfOne = sumOfOne + preNum * Math.pow(10, len - 1 - i);
        }
        if (i < len - 1) { //更新preNum和postNum，用于下一位数字的遍历
            preNum = preNum * 10 + arr[i] * 1;
            postNum = postNum - arr[i + 1] * Math.pow(10, len - 2 - i);
        }
    }
    return sumOfOne;
}
let result = countDigitOne(13);
console.log(result);