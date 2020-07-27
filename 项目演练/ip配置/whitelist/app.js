const Koa = require('koa');
const app = new Koa();

var index = require('./routes/index');
app.use(async(ctx, next) => {
    ctx.body = "hello koa"
    next()
})


app.use(index.routes(), index.allowedMethods());

app.listen(3000, () => {
    console.log("server is running")
})