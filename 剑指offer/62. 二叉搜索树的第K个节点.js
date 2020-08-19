/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    let res = inOrder(root);
    console.log(res);
    return res[k - 1]
};
let res = []; // 放外面,不然只有第一个值

function inOrder(root) {
    if (!root) return;
    inOrder(root.left);
    res.push(root.val);
    inOrder(root.right);
    return res
}

function getNode() {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let node = new TreeNode("3");
    let node1 = new TreeNode("1");
    let node2 = new TreeNode("4");
    let node3 = new TreeNode("2");
    let node4 = new TreeNode("2");
    node.left = node1;
    node.right = node2;
    node1.right = node3;
    return node;
}
let node = getNode();
let res1 = kthLargest(node, 1);
console.log(res1);