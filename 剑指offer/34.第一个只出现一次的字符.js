function FirstNotRepeatingChar(str) {
    // write code here
    const countObj = {};
    if (str.length === 0) return -1; //-1 表示没找到。不能使用0,0也是下标之一
    const arr = str.split('');
    for (let i = 0; i < arr.length; i++) {
        let v = arr[i];
        if (countObj[v]) {
            countObj[v]++;
        } else {
            countObj[v] = 1;
        }
    }
    console.log(countObj);
    for (let key in countObj) {
        if (countObj[key] === 1) {
            let firstChar = str.indexOf(key)
            return firstChar;
        }
    }
    return -1;
}
let str = "google";
let res = FirstNotRepeatingChar(str);
console.log(res);