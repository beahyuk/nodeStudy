/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let temp = [];
    let resArr = [];
    let sum = 0;
    let lastNumber = target % 2 == 0 ? target / 2 : Math.floor(target / 2) + 1;
    for (let i = 1; i <= lastNumber; i++) {
        temp.push(i);
        sum += i;
        while (sum > target) {
            sum -= temp[0];
            temp.shift();
        }
        if (sum === target) {
            temp.length >= 2 && resArr.push([...temp]);
        }
    }
    return resArr
}
let targetTest = 9;
let res = findContinuousSequence(targetTest);
console.log(res);