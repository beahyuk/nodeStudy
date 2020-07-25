/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    let arr = [0, 1, 2]; // 这里和斐波那契数列不同
    for (let i = 3; i <= N; i++) {
        arr[i] = arr[i - 2] + arr[i - 1]
    }
    return arr[N];
};
console.log(fib(7))