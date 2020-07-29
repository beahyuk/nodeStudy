/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
    if (!A || !B) {
        return false
    };
    return (
        isSubTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
    )
};

var isSubTree = function(pRoot1, pRoot2) {
    if (!pRoot2) {
        return true
    }
    if (!pRoot1) {
        return false
    }

    if (pRoot1.val !== pRoot2.val) {
        return false
    }
    return isSubTree(pRoot1.left, pRoot2.left) && isSubTree(pRoot1.right, pRoot2.right)

}