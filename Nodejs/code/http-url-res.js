var http = require("http");
var server = http.createServer();
//根据不同的请求路径发送不同的响应结果
//1.获取请求路径
//	req.url获取到的是端口号之后的那一部分路径
//  也就是说所有的url都是以“/”开头的
//2.判断路径处理响应
server.on("request",function(req,res){
    var url = req.url;
    if(url === '/products'){
       //数组类型的数据
      var products = [
          {
              name:"apple",
              price:20,
          },
          {
              name:"banna",
              price:13,
          },
          {
              name:"peach",
              price:144444,
          },
          {
              name:"purple",
              price:34323,
          }
      ]  
    };
    //响应内容只能是二进制数据或者字符串，数字，对象，数组，布尔值都要通过JSON.stringify()转换成字符串
    res.end(JSON.stringify(products))
    
    //一般用这种方式直接结束，不必先写再end
    //res.end("hello word")
});
server.listen(3000,function(){
    console.log("服务器已经启动了")
});