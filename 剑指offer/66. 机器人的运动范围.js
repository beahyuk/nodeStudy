/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

var movingCount = function(m, n, k) {
    let count = 0;
    const hasVisited = new Array(m);
    for (let i = 0; i < m; i++) {
        hasVisited[i] = new Array(n).fill(false);
    }

    function dfs(i, j) {
        if (i < 0 || j < 0 || i >= m || j >= n) return;
        const sum = (i + '' + j).split('').reduce((a, b) => +a + +b);
        if (sum <= k && !hasVisited[i][j]) {
            count++;
            hasVisited[i][j] = true;
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        }
    }
    dfs(0, 0);
    return count;
};

// function dfs(i, j, hasVisited, count, k, m, n) {
//     if (i < 0 || j < 0 || i >= m || j >= n) return;
//     const sum = (i + '' + j).split('').reduce((a, b) => +a + +b);
//     if (sum <= k && !hasVisited[i][j]) {
//         count++;
//         hasVisited[i][j] = true;
//         dfs(i + 1, j, hasVisited, count, k, m, n);
//         dfs(i - 1, j, hasVisited, count, k, m, n);
//         dfs(i, j + 1, hasVisited, count, k, m, n);
//         dfs(i, j - 1, hasVisited, count, k, m, n);
//     }
// }
let row = 2;
let col = 3;
let k = 1;
let res = movingCount(row, col, k);
console.log(res);