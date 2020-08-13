/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
    if (n == 0 || m == 0) return -1;
    let child = [];
    let delIndex = 0;
    for (let i = 0; i < n; i++) {
        child[i] = i;
    }
    while (child.length > 1) {
        const k = m - 1;
        delIndex = (delIndex + k) % child.length;
        child.splice(delIndex, 1);
    }
    return child[0];
};
let num = 5,
    target = 3;
let res = lastRemaining(num, target);
console.log(res);