// 牛客网风格，通过
var VerifySquenceOfBST = function(sequence) {
    if (sequence.length == 0) return false;

    return sequenceVerfiy(sequence, 0, sequence.length - 1);
}

function sequenceVerfiy(sequence, start, end) {
    // 1.边界判断，若数组中只有一个，或没有，返回true
    if (start >= end) return true;
    let flag = start;
    let root = sequence[end];
    // 2. 找左右节点的分界点，比根节点大的第一个数就是右子树的开始
    while (flag <= end && sequence[flag] < root) {
        flag++;
    }
    // 3.右子树进行判断，若小于根节点返回false
    for (let i = flag; i < end; i++) {
        if (sequence[i] < root) {
            return false
        }
    }
    // 4.对左右字树分别进行判断
    let left = sequenceVerfiy(sequence, start, flag - 1);
    let right = sequenceVerfiy(sequence, flag, end - 1);
    // 5.如果都为true 返回true
    return left && right
}