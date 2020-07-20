const Koa = require('koa');
const app = new Koa();
const path = require("path")
const router = require('koa-router')(); //注意：引入方式


app.use(async(ctx, next) => {
    next();
    if (ctx.status == 404) {
        ctx.status = 400;
        ctx.body = "这是一个404页面";
    };
});

// 静态资源中间件
const static = require("koa-static");
// 127.0.0.1:3000//css/basic.css 文件目录是目录名/publc/css/basic.css
// 首先去public文件找， 如果找到返回对应的文件，找不到就next()
// koa-static第三方中间件里面有自动调用next()
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));
// post表单数据中间件
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

// 最终显示：hello 2 覆盖掉前面的1
router.get('/login', (ctx, next) => {
    console.log("111")
    ctx.body = "1";
});



app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000, () => {
    console.log("server is running")
})