var CQueue = function() {
    this.instack = [];
    this.outstack = []
};

CQueue.prototype.appendTail = function(value) {
    this.instack.push(value)
};

CQueue.prototype.deleteHead = function() {
    const { instack, outstack } = this;
    if (outstack.length) {
        return outstack.pop()
    } else {
        while (!instack.length) {
            outstack.push(instack.pop())
        }
        return outstack.pop() || -1
    }
}