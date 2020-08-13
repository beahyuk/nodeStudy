/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.split(' ').reverse().join(' ')
};
let str = "student. a am I";
let res = reverseWords(str);
console.log(res);