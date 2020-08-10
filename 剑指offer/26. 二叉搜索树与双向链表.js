/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) {
    if (!root) return null;
    let pLast = null;
    pLast = inOrder(root, pLast);
    let phead = pLast;
    while (phead && phead.left) {
        phead = phead.left;
    }
    // 形成环状结构
    phead.left = pLast;
    pLast.right = phead;
    return phead;
};

function inOrder(node, pLast) {
    if (!node) return null;
    // 遍历左子树
    if (node.left) {
        pLast = inOrder(node.left, pLast)
    };
    // 当前节点处理
    // 1.新节点的left指向末尾节点
    node.left = pLast;
    // 2.将末尾节点的right指向新节点
    if (pLast === null) {
        pLast = node;
    } else {
        pLast.right = node;
    }

    // 3.更新末尾节点 plast = node
    pLast = node;
    // 遍历右子树
    if (node.right) {
        pLast = inOrder(node.right, pLast)
    };
    return pLast
}