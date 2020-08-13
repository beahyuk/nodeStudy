/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    if (s == null || s.length == 0) return '';
    return s.slice(n) + s.slice(0, n)
};
let str = "abcdefg";
let n = 2;
let res = reverseLeftWords(str, n);
console.log(res);