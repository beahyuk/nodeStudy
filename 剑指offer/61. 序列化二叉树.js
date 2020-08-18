/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let queue = [];
    let res = "";
    if (!root) return "[]";
    queue.push(root);
    while (queue.length) {
        let pRoot = queue.shift();

        if (pRoot) {
            queue.push(pRoot.left);
            queue.push(pRoot.right);
            res += `${pRoot.val},` //逗号不能丢
        } else {
            res += "null,"; // 逗号不能丢
        }
    }
    res = res.substring(0, res.length - 1);
    return `[${res}]`;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
var deserialize = function(data) {
    if (data.length <= 2) return null;
    let nodes = data.substring(1, data.length - 1).split(',');
    let root = new TreeNode(parseInt(nodes[0]));
    nodes.shift();
    let queue = [];
    queue.push(root);

    while (queue.length) {
        let node = queue.shift();
        const leftVal = nodes.shift();
        if (leftVal !== "null") {
            node.left = new TreeNode(leftVal);
            queue.push(node.left);
        }
        const rightVal = nodes.shift();
        if (rightVal !== "null") {
            node.right = new TreeNode(rightVal);
            queue.push(node.right);
        }
    }
    return root
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

function getNode() {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    let node = new TreeNode(1);
    let node1 = new TreeNode(2);
    let node2 = new TreeNode(3);
    let node3 = new TreeNode(4);
    let node4 = new TreeNode(5);
    node.left = node1;
    node.right = node2;
    node2.left = node3;
    node2.right = node4;
    return node;
}
let node = getNode();
let res = deserialize(serialize(node));
console.log(res);