function fn(callback) {
    setTimeout(() => {
        let data = "hello,我是一秒后执行的data"
        callback(data)
    }, 1000);
};
// 执行fn()函数，需要实参，只不过这个参数是函数类型
// 在setTimeout()这个异步函数中，要等一秒后，才执行setTimeout里的函数体
// 在setTimeout()中调用 fn的参数，此时的形参callback
// 因为形参是函数类型，所以也要给形参callback一个参数
fn(function(callDabta) {
    console.log(callDabta)
});
// 回调函数：获取异步操作的结果