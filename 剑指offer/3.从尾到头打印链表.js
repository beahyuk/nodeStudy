function reverPrint(head1) {
    let res = [];
    let pNode = head;
    while (pNode !== null) {
        res.unshift(pNode.val);
        pNode = pNode.next;
    }
    return res
}