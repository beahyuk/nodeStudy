let array = [
    [1, 2, 3, 4, 5],
    [11, 12, 13, 14, 15],
    [21, 22, 23, 24, 25],
    [31, 32, 33, 34, 35]
];

function find(array, target) {
    let rowlen = array.length,
        collen = array[0].length;
    let row = rowlen - 1,
        col = 0;
    if (rowlen === 0 && collen === 0) {
        return -1
    }
    while (row >= 0 && col <= collen - 1) {
        if (target > array[row][col]) {
            col++;
        } else if (target < array[row][col]) {
            row--;
        } else return [row, col, array[row][col]]
    }
    return false
}

console.log(find(array, 23))