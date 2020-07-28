var getKthFromEnd = function(head, k) {
    const stack = [];
    const res = [];
    // 所有节点入栈
    while (head) {
        stack.push(head);
        head = head.next;
    };
    // 出栈第k个节点
    while (k > 0) {
        res = stack.pop();
        k--;
    }
    return res;
};