/*
 * @Author: your name
 * @Date: 2020-07-11 22:57:09
 * @LastEditTime: 2020-07-11 23:10:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\回调函数.js
 */

// function add(x, y) {
//     console.log(1);
//     setTimeout(() => {
//         console.log(2);
//         var ret = x + y;
//         return ret;
//     }, 100);
//     console.log(3);
//     // 到这里执行结束，不会等到前面的定时器，所以直接就返回了默认值undefined
// }
// console.log(add(4, 2)) //undefined

function add(x, y, callback) {
    console.log(1);
    setTimeout(() => {
        console.log(2);
        var ret = x + y;
        callback(ret)
    }, 1000);
    console.log(3);
};
add(2, 4, function(ret) {
    console.log(ret)
})