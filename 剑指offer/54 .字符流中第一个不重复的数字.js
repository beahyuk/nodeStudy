/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
    if (!s) return " "
    let arr = s.split('');
    let res = arr.filter((v, index, arr) => arr.indexOf(v) === arr.lastIndexOf(v))[0]
    return res ? res : " "
};
let str = 'abaccdeff';
let res = firstUniqChar(str);
console.log(res); //b