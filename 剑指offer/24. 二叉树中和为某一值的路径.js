/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let list = [];
    let listAll = [];
    return findPathNode(root, sum, list, listAll);
};

function findPathNode(root, sum, list, listAll) {
    if (root) {
        let diff = sum - root.val;
        // 单个节点要做的事
        list.push(root.val);
        if (root.left == null && root.right == null && diff == 0) {
            listAll.push(Array.of(...list));
        }
        // 左右子节点递归调用
        findPathNode(root.left, diff, list, listAll);
        findPathNode(root.right, diff, list, listAll);
        list.pop(); // 回溯先序遍历一条路径结束，不符合条件时，将最后一个数弹出如5,4,4,7-->5,4,4
    }
    return listAll
}

var getNode = function() {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let node = new TreeNode(5);
    let node1 = new TreeNode(4);
    let node2 = new TreeNode(8);
    let node3 = new TreeNode(11);
    let node4 = new TreeNode(13);
    let node5 = new TreeNode(4);
    let node6 = new TreeNode(7);
    let node7 = new TreeNode(2);
    let node8 = new TreeNode(5);
    let node9 = new TreeNode(1);
    node.left = node1;
    node.right = node2;
    node1.left = node3;
    node2.left = node4;
    node2.right = node5;
    node3.left = node6;
    node3.right = node7;
    node5.left = node8;
    node5.right = node9;
    return node
}
let node = getNode()
let targetSum = 22;
let res = pathSum(node, targetSum);
console.log(res);