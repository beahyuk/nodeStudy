/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (!root) return true;
    return getMirror(root, root)
};

function getMirror(root1, root2) {
    // 如果都为null 对称
    if (!root1 && !root2) return true;
    // 只要其中一个为null,另一个不为 不对称
    if (!root1 || !root2) return false;

    // 判断根节点
    // 判断root1的左树 和 root2的右树
    // 判断root1的右树 和 root2的左树
    return root1.val == root2.val && getMirror(root1.left, root2.right) && getMirror(root1.right, root2.left)
}