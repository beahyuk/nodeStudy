var fs = require("fs");
var http = require("http");
var url = require("url");
var template = require("art-template");

var comments = [{
    name: "12",
    content: 'aaaaa',
    time: "2020.07.08"
}, {
    name: "13",
    content: 'bbbbbb',
    time: "2020.07.08"
}, {
    name: "14",
    content: 'cccccc',
    time: "2020.07.08"
}, {
    name: "15",
    content: 'dddddd',
    time: "2020.07.08"
}, ];
http
    .createServer(function(req, res) {
        var parseObj = url.parse(req.url, true);
        var pathName = parseObj.pathname;

        //读取首页页面
        if (pathName === '/') {
            fs.readFile('./页面/index.html', function(err, data) {
                if (err) {
                    return res.end("读取首页文件失败");
                }
                // 读取成功后，使用模板引擎替换字段
                let ret = template.render(data.toString(), { comments });
                res.end(ret);
            });

        } else if (pathName === '/post') {
            // 读取发表评论页面
            fs.readFile("./页面/post.html", function(err, data) {
                if (err) {
                    return res.end("读取发表页面失败")
                };
                res.end(data)
            });
        } else if (pathName.indexOf('/public') === 0) {
            //检查静态资源并响应
            //整个public目录中的资源都允许被访问
            // public/lib   public/css   public/js
            // 统一处理：
            //      如果请求路径是以/public/开头的，则认为要获取public中的某个资源
            //      所以可以直接把请求路径当作文件路径来直接进行读取

            fs.readFile('./' + pathName, 'utf-8', function(err, data) {
                if (err) {
                    return res.end("44404");
                }
                res.end(data)
            });
        } else if (pathName === "/comments") {
            // 1.获取表单提交的数据：parseObj.query
            var comment = parseObj.query;
            // 2.将日期添加到数据对象中，然后存储在数组中
            comment.time = "2020.07.09";
            comments.unshift(comment);
            // 3.让用户重定向跳转到首页。通过服务器让客户端重定向
            // 3.1  设置状态码，状态码设置为302临时重定向
            res.statusCode = 302;
            // 3.2  在响应头通过location告诉客户端往哪儿重定向
            // 如果客户端发现收到服务器响应的状态码为302，就会自动去响应头找Location
            res.setHeader('Location', '/');
            res.end();
        } else {
            res.end("404");
        }
    })
    .listen(3000, function() {
        console.log("服务器已启动")
    })