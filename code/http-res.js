var http = require("http");
var server = http.createServer();
//request 请求事件处理函数，需要接收两个参数：
//  1.request 请求对象
//  请求对象可以用来获取客户端的一些请求信息，例如请求路径
//  2.reponse 响应对象
//  响应对象可以用来给客户端发送响应消息
server.on("request",function(request,reponse){
    console.log("收到客户端请求，请求路径为："+request.url);
    
    //response对象有一个方法：write可以用来给客户端发送响应数据
    //write可以使用多次，但是最后一定要使用end来结束响应，否则客户端会一直等待
    reponse.write("hello word i'm reponse.write");
    //告诉客户端，已经回应结束
    reponse.end();
});

server.listen(3000,function(){
    console.log("服务器启动成功")
});