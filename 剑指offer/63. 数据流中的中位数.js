/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.array = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.array.push(num);
    for(let i = this.array.length -2 ; this.array[i]>num;i--){
        [this.array[i],this.array[i+1]] = [this.array[i+1],this.array[i]];
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if(this.array.length & 1===1){
        return this.array[(this.array.length - 1) /2];
    } 
    return (this.array[this.array.length / 2] + this.array[this.array.length / 2 -1]) /2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */