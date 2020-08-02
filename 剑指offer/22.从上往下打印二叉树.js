/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    const queue = [];
    const res = [];
    if (root === null) {
        return res;
    }

    queue.push(root);
    while (queue.length) {
        const pRoot = queue.shift();
        if (pRoot.left !== null) {
            queue.push(pRoot.left);
        }
        if (pRoot.right !== null) {
            queue.push(pRoot.right);
        }
        res.push(pRoot.val);
    }
    return res;
};