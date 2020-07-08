var http = require("http");
var server = http.createServer();
server.on("request",function(){
  console.log("客户端发送请求")
});
server.listen(3000,function(){
  console.log("服务器启动成功")
})