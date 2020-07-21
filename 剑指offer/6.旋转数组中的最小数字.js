let arr = [3, 4, 5, 1, 2];
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
    if (numbers.length === 0) return 0
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < numbers[0]) {
            return numbers[i]
        }
    }
    return numbers[0]
}
console.log(minArray(arr))