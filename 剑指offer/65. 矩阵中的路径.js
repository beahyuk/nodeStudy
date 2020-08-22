/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let cols = board[0].length;
    let rows = board.length;

    let index = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (isHasPath(col, row, cols, rows, board, word, index)) return true //找打初始位置点
        }
    }
    return false
};

function isHasPath(col, row, cols, rows, board, word, index) {
    // 不符合条件的
    // 一定要先判断行的数 再判断 列的数
    //  当前行数是大于等于 总行数时,返回false
    if (row < 0 || row >= rows || col < 0 || col > cols || board[row][col] !== word[index]) return false;
    if (index == word.length - 1) return true; // 字符串全遍历完成
    var temp = board[row][col]; // 记录当前值
    board[row][col] = '-'; // 锁上,防止又被访问到
    let res =
        isHasPath(col - 1, row, cols, rows, board, word, index + 1) ||
        isHasPath(col + 1, row, cols, rows, board, word, index + 1) ||
        isHasPath(col, row - 1, cols, rows, board, word, index + 1) ||
        isHasPath(col, row + 1, cols, rows, board, word, index + 1);

    board[row][col] = temp; // 撤销选择
    return res // 没找到
}
// let arr = [
//     ["A", "B", "C", "E"],
//     ["S", "F", "C", "S"],
//     ["A", "D", "E", "E"]
// ];
// let str = "ABCCED"
let arr = [
    ["a", "b"],
    ["c", "d"]
];
let str = "abcd";
let res = exist(arr, str);
console.log(res);