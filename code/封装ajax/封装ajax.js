function get(url, callback) {
    // 1.创建一个new XMLHttpRequest对象
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    // 2.配置，请求方法，URL
    xhr.open("GET", url, true);
    // 3.通过网络发送请求
    xhr.send();
    // 4.当接收到响应后，将调用此函数
    xhr.onload(function() {
        callback(xhr.response)
    });
};
get('./db.json', function(ret) {
    console.log(ret)
})