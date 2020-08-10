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
var isBalanced = function(root) {
    return treeDepth(root) !== -1;
};

function treeDepth(pRoot) {
    if (!pRoot) return 0;
    const leftDepth = treeDepth(pRoot.left);
    if (leftDepth === -1) return -1;
    const rightDepth = treeDepth(pRoot.right);
    if (rightDepth === -1) return -1;
    return Math.abs(leftDepth - rightDepth) > 1 ? -1 : Math.max(leftDepth, rightDepth) + 1
}

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
    let node5 = new TreeNode(14);
    node.left = node1;
    node.right = node2;
    node2.left = node3;
    node2.right = node4;
    node4.right = node5;
    return node
}
let node = getNode();
let res = isBalanced(node);
console.log(res);