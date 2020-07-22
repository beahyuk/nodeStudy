/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    let arr = [0, 1, 1];
    for (let i = 3; i <= N; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[N];
};
console.log(fib(7))