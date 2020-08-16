/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode) {
    // write code here
    if (!pNode) return null;

    // 第一种:有右子节点
    if (pNode.right) {
        pNode = pNode.right;
        while (pNode.left) { // 如果右孩子有左节点,就一直找到最左节点
            pNode = pNode.left;
        }
        return pNode;
    }

    // 第二种:没有右子节点
    while (pNode.next) {
        if (pNode == pNode.next.right) { //如果是父节点的左节点,下一个节点是父节点
            return pNode.next;
        }
        pNode = pNode.next; // 否则一直往上找,直到父是左节点
    }

    // 第三种: 尾节点
    return null
}