/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let newArr = [];
    let flag = true;

    while (matrix.length) {
        // 从左到右
        if (flag) {
            // 第一层
            newArr = newArr.concat(matrix.shift());
            // matrix.length-1 这里是个坑，注意
            // "现在"的第一层到最后第一层的末尾
            for (let i = 0; i < matrix.length - 1; i++) {
                matrix[i].length && newArr.push(matrix[i].pop());
            }
        } else {
            // 从右到左
            // 最后一层
            newArr = newArr.concat(matrix.pop().reverse());
            // 现在matrix.length-1 这里也是坑
            // 现在的最后一层到第一层的开端
            for (let i = matrix.length - 1; i > 0; i--) {
                matrix[i].length && newArr.push(matrix[i].shift());
            }
        }
        flag = !flag;

    }
    return newArr;

};
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
console.log(spiralOrder(matrix));