const express = require('express');
const router = express.Router();

const { User } = require('../model');
const { sendEmail, login, register } = require('../controller/index');



router.get('/api', (req, res) => {
    res.send("hello word")
});
router.get('/api/users', async(req, res) => {
    const users = await User.find();
    res.send(users)
});

router.post('/api/register', register)
router.post('/api/login', login);
router.post('/api/getEmail', sendEmail)


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

// router.get('/api/home', auth, async(req, res) => {
//     res.send(req.user)
// })
module.exports = router