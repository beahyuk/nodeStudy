const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { User } = require('./model');
const jwt = require('jsonwebtoken')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 设置跨越请求
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


const SECRET = "dsfadfasfafafdafasdf@adf"

app.get('/api', (req, res) => {
    res.send("hello word")
});
app.get('/api/users', async(req, res) => {
    const users = await User.find();
    res.send(users)
});

app.post('/api/register', async(req, res) => {
    const username = await User.findOne({
        username: req.body.username
    });
    const email = await User.findOne({
        email: req.body.email
    });
    // 1.用户名已存在/邮箱已存在
    if (username) {
        res.send({
            status: 422,
            msg: "该用户名已注册"
        })
    } else if (email) {
        res.send({
            status: 422,
            msg: "该邮箱已注册"
        })
    } else {
        const users = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.send({
            users,
            status: 200,
            msg: "注册成功"
        })
    }
})
app.post('/api/login', async(req, res) => {
    // 1.查看用户名是否存在
    const user = await User.findOne({
        username: req.body.username,
    })
    if (!user) {
        res.send({
            status: 422,
            msg: "用户名不存在"
        })
    };
    // 2.查看密码是否正确
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        res.send({
            status: 422,
            msg: "密码错误"
        });
    };
    // 3.登录成功后，生成token值
    const token = jwt.sign({
        id: String(user._id),
    }, SECRET)
    res.send({
        user,
        token,
        status: 200,
        msg: "登录成功"
    });
});
// 中间件：验证授权
const auth = async(req, res, next) => {
    console.log(req.headers.authorization);
    // 获取客户端请求头的token
    const rawToken = String(req.headers.authorization).split('').pop();
    const tokenData = jwt.verify(rawToken, SECRET)
    console.log(tokenData);
    // 获取用户id
    const id = tokenData.id;
    req.user = await User.findById(id)
    next()
}

app.get('/api/home', auth, async(req, res) => {
    res.send(req.user)
})

app.listen(3001, () => {
    console.log("server is running")
})