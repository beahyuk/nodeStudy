/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function(postorder) {
    let length = postorder.length;
    const root = postorder[length - 1];
    let index = 0;
    // 1.边界判断
    if (length < 2) return true;
    // 2.找到左右子树的分界点
    for (let i = 0; i < length - 1; i++) {
        if (postorder[i] > root) {
            index = i;
            break;
        } else {
            index = length - 2;
        }
    }
    // 3.判断右子树是否满足条件
    for (let i = index; i < length - 1; i++) {
        if (postorder[i] < root) {
            return false;
        }
    }
    // 4. 分别对左右子树进行遍历
    return (
        verifyPostorder(postorder.slice(0, index)) &&
        verifyPostorder(postorder.slice(index, length - 1))
    )
};
let arr = [1, 3, 2, 5]
let res = verifyPostorder(arr)
console.log(res);