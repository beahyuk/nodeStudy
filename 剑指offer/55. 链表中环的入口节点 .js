/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead) {
    // write code here
    let pFast = pHead;
    let pSlow = pHead;
    while (pFast !== null && pFast.next !== null) {
        pSlow = pSlow.next;
        pFast = pFast.next.next;
        if (pFast === pSlow) {
            let p = pHead;
            while (p !== pSlow) {
                p = p.next;
                pSlow = pSlow.next;
            }
            return p
        }
    }
    return null

}