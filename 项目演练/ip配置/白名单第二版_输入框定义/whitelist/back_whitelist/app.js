const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')

var index = require('./routes/index');

// 设置跨越请求
app.use(cors());

app.use(bodyParser());
app.use(async(ctx, next) => {
    ctx.body = "hello koa";
    //await 必有
    await next();
})


app.use(index.routes(), index.allowedMethods());

app.listen(3000, () => {
    console.log("server is running")
})