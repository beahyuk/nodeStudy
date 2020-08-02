/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */

var validateStackSequences = function(pushed, popped) {
    const stack = [];
    let index = 0;
    // 如果出栈序列和进栈序列长度为0，返回true；长度不同，返回false
    if (pushed.length === 0 && popped.length === 0) return true
    if (pushed.length !== popped.length) return false
    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i])
        while (stack.length !== 0 && stack[stack.length - 1] === popped[index]) {
            stack.pop();
            index += 1;
        }
    }
    return stack.length === 0;
}