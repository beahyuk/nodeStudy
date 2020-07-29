var merge = function(pHead1, pHead2) {
    let pHead3 = null;
    if (pHead1 === null) { return pHead2 };
    if (pHead2 === null) { return pHead1 };
    if (pHead1.val < pHead2.val) {
        pHead3 = pHead1;
        pHead3.next = merge(pHead1.next, pHead2);
    } else {
        pHead3 = pHead2;
        pHead3.next = merge(pHead1, pHead2.next);
    }
    return pHead3
}