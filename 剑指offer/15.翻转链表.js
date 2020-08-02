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

// function LinkedList() {
//     // 内部的类：节点类
//     function ListNode(val) {
//         this.val = val;
//         this.next = null;
//     }
//     // 属性
//     this.head = null;
//     this.length = 0;

//     LinkedList.prototype.append = function(data) {
//         // 1.创建节点
//         let newNode = new ListNode(data);

//         // 2.判断是否添加的是第一个节点
//         if (this.length == 0) {
//             this.head = newNode;
//         } else {
//             let cur = this.head;
//             while (cur.next) {
//                 cur = cur.next;
//             }
//             cur.next = newNode;
//         }
//         // 3.length +1
//         this.length += 1;
//     }
//     LinkedList.prototype.reverseList = function(head) {
//         let cur = this.head,
//             pre = null,
//             temp = null;
//         while (cur) {
//             temp = cur.next; //保存下一个节点，不然cur.next 指向前一个节点后，原先的next节点就找不到了
//             cur.next = pre; //第一个pre就是为null，箭头翻转
//             pre = cur; // 前面箭头翻转后，pre和cur都向前一步
//             cur = temp
//         }
//         return pre; //最后返回pre，因为cur已经null了
//     }
// }
function ListNode(val) {
    this.val = val;
    this.next = null;
}
let node = new ListNode("1");
let node1 = new ListNode("2");
let node2 = new ListNode("3");
let node3 = new ListNode("4");
node.next = node1;
node1.next = node2;
node2.next = node3;
var toString = function(head) {
    var current = head;
    var listString = "";
    while (current) {
        listString += current.val + ""
        current = current.next;
    }
    return listString;
}
var reverseList = function(head) {
    let cur = head,
        pre = null,
        temp = null;
    while (cur) {
        temp = cur.next; //保存下一个节点，不然cur.next 指向前一个节点后，原先的next节点就找不到了
        cur.next = pre; //第一个pre就是为null，箭头翻转
        pre = cur; // 前面箭头翻转后，pre和cur都向前一步
        cur = temp
    }
    return pre; //最后返回pre，因为cur已经null了
}
let res = reverseList(node)
console.log(toString(res));