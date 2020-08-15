/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    let result = s.match(/\s*[+-]?((\d+(\.\d*)?)|\.\d+)([eE][+-]?\d+)?\s*/g);
    return result[0] === s
};
var isNumber = function(s) {
    s = s.trim();
    if (!s) return false;
    return !isNaN(s)
}
let str = "+100 5e2 -123 3.12 -1E-16 0123";
let str1 = "0 12e 1a3.14 1.2.2 +-4 12e+5.2"
let arr = str1.split(' ');
for (let i = 0; i < arr.length; i++) {
    let res = isNumber(arr[i]);
    console.log(res);
}