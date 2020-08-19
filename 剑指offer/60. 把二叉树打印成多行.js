/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let queue = [];
    let arr = [];
    let level = 0;
    if (!root) return [];
    queue.push(root);
    while (queue.length) {
        arr[level] = [];
        let levelNum = queue.length;
        while (levelNum--) {
            let pRoot = queue.shift();
            if (pRoot.left) {
                queue.push(pRoot.left);
            }
            if (pRoot.right) {
                queue.push(pRoot.right);
            }
            arr[level].push(pRoot.val);
        }
        level++;
    }
    return arr;
};

function getNode() {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let node = new TreeNode("3");
    let node1 = new TreeNode("9");
    let node2 = new TreeNode("20");
    let node3 = new TreeNode("15");
    let node4 = new TreeNode("7");
    node.left = node1;
    node.right = node2;
    node2.left = node3;
    node2.right = node4;
    return node;
}
let node = getNode();
let res = levelOrder(node);
console.log(res);