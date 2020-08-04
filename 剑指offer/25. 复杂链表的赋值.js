/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) return null;

    const map = new Map();
    let node = head;
    // 1.定义新的头结点，并且保持原节点-复制节点的映射关系
    const newHead = new Node(node.val);
    let newNode = newHead;
    map.set(node, newNode);

    // 2.第一次遍历：复制每个节点和next指针，并且保存“原节点-复制节点”的映射关系
    while (node.next) {
        // 这里每一个都new Node 是深拷贝，单独开辟内存空间
        newNode.next = new Node(node.next.val);
        node = node.next;
        newNode = newNode.next;
        map.set(node, newNode);
    }

    // 3. 第二次遍历：通过哈希表获得节点对应的复制节点，更新random指针
    newNode = newHead;
    node = head;
    while (newNode) {
        newNode.random = map.get(node.random);
        newNode = newNode.next;
        node = node.next;
    }
    return newHead;
};