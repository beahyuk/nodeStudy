function MoreThanHalfNum_Solution(numbers) {
    // write code here
    if (numbers.length == null) return 0;
    let countObj = {};
    for (let i = 0; i < numbers.length; i++) {
        let v = numbers[i];
        if (countObj[v]) {
            countObj[v]++;
        } else {
            countObj[v] = 1;
        }
    }

    for (let key in countObj) {
        if (countObj[key] > numbers.length / 2) {
            return key;
        }
    }
    return 0
}
let arr = [1, 2, 3, 2, 2, 2, 5, 4, 2];
let res = MoreThanHalfNum_Solution(arr)
console.log(res);