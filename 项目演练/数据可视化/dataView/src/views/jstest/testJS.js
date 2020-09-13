let d = 1;

function add(a, b) {
    let result = plus(a, b) + this.c;
    return result
}

function plus(a, b) {
    return a - b + d;
    // return a - b + d + this.c;
}

class GetC {
    constructor(c) {
        this.c = c;
    }
}
GetC.prototype.add = add;


export { GetC }