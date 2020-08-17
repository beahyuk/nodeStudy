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
    if (!root) return [];
    let queue = [];
    queue.push(root);
    let level = 0;
    let arr = [];
    while (queue.length) {
        arr[level] = []; //第level的遍历结果

        let levelNum = queue.length; // 第level层的节点数量
        while (levelNum--) {
            let pRoot = queue.shift();
            if (pRoot.left) {
                queue.push(pRoot.left);
            }
            if (pRoot.right) {
                queue.push(pRoot.right);
            }
            arr[level].push(pRoot.val)
        }
        if (level % 2 !== 0) {
            arr[level].reverse();
        }
        level++;
    }
    return arr
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