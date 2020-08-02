/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let l3 = null;
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    if (l1.val < l2.val) {
        l3 = l1;
        l3.next = mergeTwoLists(l1.next, l2);
    } else {
        l3 = l2;
        l3.next = mergeTwoLists(l1, l2.next)
    }
    return l3
};