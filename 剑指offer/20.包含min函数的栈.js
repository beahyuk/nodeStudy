var Minstack = function() {
    this.dataStack = [];
    this.minStack = [];
}
Minstack.prototype.push = function(x) {
    const length = this.minStack.length;
    this.dataStack.push(x);
    if (length) {
        this.minStack[length - 1] >= x && this.minStack.push(x);
    } else {
        this.minStack.push(x);
    }
}
Minstack.prototype.pop = function() {
    if (this.minStack[this.minStack.length - 1] === this.dataStack[this.dataStack.length - 1]) {
        this.minStack.pop();
    }
    this.dataStack.pop();
}

Minstack.prototype.top = function() {
    const length = this.dataStack.length;
    if (length) return this.dataStack[length - 1];
    else return null
}
Minstack.prototype.min = function() {
    const length = this.minStack.length
    if (length) return this.minStack[length - 1];
    else return null;
}