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
var reverseList = function(head) {
    let pPre = null;
    let pNext = null;
    while (head !== null) {
        pNext = head.next;
        head.next = pPre;
        pPre = head;
        head = pNext;
    }
    return pPre
};