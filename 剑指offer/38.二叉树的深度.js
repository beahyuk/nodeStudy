/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
};

function getNode() {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let node = new TreeNode(5);
    let node1 = new TreeNode(4);
    let node2 = new TreeNode(11);
    let node3 = new TreeNode(6);
    let node4 = new TreeNode(12);
    node.left = node1;
    node.right = node2;
    node2.left = node3;
    node2.right = node4;
    return node
}
let node = getNode();
let res = maxDepth(node);
console.log(res);