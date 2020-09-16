const nodemailer = require('nodemailer');
const { User } = require('../model');
const bcrypt = require('bcryptjs');
const { use } = require('../routes');
const jwt = require('jsonwebtoken');
const SECRET = "dsfadfasfafafdafasdf@adf"
exports.login = async(req, res) => {
    // 1.查看用户名是否存在
    const user = await User.findOne({
        username: req.body.username,
    })
    if (!user) {
        res.send({
            status: -1,
            msg: "用户名不存在"
        })
    }else{
        if(req.body.password !== user.password ){
            res.send({
                status: -2,
                msg: "密码错误"
            });
        }else{
             res.send({
                status: 200,
                msg: "登录成功",
                data:{
                    token:"i'm token", // test
                    username:user.username
                }
            });
    }
    }
    console.log(req.body.password,user.password );
    // 2.查看密码是否正确
    
    // const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    // if (!isPasswordValid) {
    //     res.send({
    //         status: 422,
    //         msg: "密码错误"
    //     });
    // };
    // // 3.登录成功后，生成token值
    // const token = jwt.sign({
    //     id: String(user._id),
    // }, SECRET)
    // res.send({
    //     user,
    //     token,
    //     status: 200,
    //     msg: "登录成功"
    // });
};
exports.register = async(req, res) => {
    const username = await User.findOne({
        username: req.body.username
    });
    const email = await User.findOne({
        email: req.body.email
    });
    // 1.用户名已存在/邮箱已存在
    if (username) {
        res.send({
            status: -1,
            msg: "该用户名已注册"
        })
    } else if (email) {
        res.send({
            status: -2,
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
};

exports.sendEmail = async(req, res) => {
    // 1.查看用户名/邮箱是否存在
    const keyword = req.body.account;
    const reg = new RegExp(keyword, 'i');
    const user = await User.findOne({
        $or: [
            { username: { $regex: reg } },
            { email: { $regex: reg } }
        ]
    });
    if (!user) {

        res.send({
            status: -1,
            msg: "用户不存在",
         
        })
    }else{
        console.log(user.email);
        res.send({
            status:200,
            data:{
                email:user.email
            }
        })
    }
    // sendTargetMail(user.email)
    // User.findOneAndUpdate({ email: user.email }, { password: "666666" }, (err, ret) => {
    //     if (err) {
    //         console.log('update fail', err);
    //     }
    //     console.log('update success', ret);
    // })
    // res.send({
    //     email: user.email
    // })
    // console.log(user.email);
};

function sendTargetMail(targetMail) {
    // 创建传输对象
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
            user: 'username@163.com',
            pass: '*****'
        }
    });

    // 设置电子邮件
    let mailOptions = {
        from: '"发布者姓名"<username@163.com>', //邮件来源
        to: targetMail, // 邮件发送到哪里,多个邮箱使用逗号隔开
        subject: '重置密码',
        text: '你的新密码是666666'
    };
    // 使用定义的传输对象发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message:${info.messageId},sent:${info.response}`);
    })
}