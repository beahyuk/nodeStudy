/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let current = head;
    let temp = current.next;
    while (temp && current) {
        if (temp.val == current.val) {
            current.next = temp.next;
            temp = temp.next;
        } else {
            current = temp;
            temp = current.next;
        }
    }
    return head;
};



function getNode() {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    let node = new ListNode("1");
    let node1 = new ListNode("1");
    let node2 = new ListNode("2");
    node.next = node1;
    node1.next = node2;
    return node
}

function getString(head) {
    let arr = [];
    let curr = head;
    while (curr) {
        arr.push(curr.val);
        curr = curr.next;
    }
    return arr;
}
let headTest = getNode();
let delNode = deleteDuplicates(headTest);
let res = getString(delNode);
console.log(res);