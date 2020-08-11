var getIntersectionNode = function(headA, headB) {
    const lengthA = getLength(headA);
    const lengthB = getLength(headB);
    // 创建快慢指针
    let plong = null;
    let pshort = null;
    let diff = 0;
    if (lengthA > lengthB) {
        diff = lengthA - lengthB;
        plong = headA;
        pshort = headB;
    } else {
        diff = lengthB - lengthA;
        plong = headB;
        pshort = headA;
    }
    // 1.让长的指针走到 和短的一样位置
    while (diff) {
        plong = plong.next;
        diff--;
    }
    // 2.让长链表的指针和短链表指针一起走，直到遇到第一个公共节点
    while (plong) {
        if (plong === pshort) {
            return plong;
        }
        plong = plong.next;
        pshort = pshort.next
    }
    return null;
};
// 获得链表的长度
var getLength = function(head) {
    let cur = head;
    let length = 0;
    while (cur) {
        cur = cur.next;
        length += 1;
    }
    return length
}