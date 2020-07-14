var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 1.连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动创建
mongoose.connect('mongodb://localhost/itcast', { useNewUrlParser: true, useUnifiedTopology: true });

// 2.设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});
// 3.将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为model
// 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//            mongoose会自动将大写名词的字符串生成 小写复数  的集合名称
//            例如这里的 User 最终会变成 users 集合名称
// 第二个参数：架构Schema
// 返回值：模型架构函数
var User = mongoose.model('User', userSchema);
// 4.当我们有了模型构造函数之后，就可以使用这个构造函数对users集中的数据增删改查了
// 4.1 增加数据
// var admin = new User({
//     username: 'Linda',
//     password: '12324',
//     email: 'linda@admin.com'
// });

// admin.save(function(err, ret) {
//     if (err) {
//         console.log(err);
//     };
//     console.log("添加成功");
//     console.log(ret)
// });

// 注册功能
// 先查找，查找成功后 发现查找对象为空，就注册保存；否则，返回注册失败
//        查找失败后，返回ret
User.findOne({ username: 'zs' })
    .then(function(user) {
        if (user) {
            // 用户存在
            console.log("用户已注册")
        } else {
            // 用户不存在
            // 返回保存新用户信息
            return new User({
                username: "zs",
                password: '1111',
                email: 'zs@aa.com'
            }).save()
        }
    }, function(err) {
        console.log(err);
    })
    .then(function(data) {
        console.log('注册成功')
        console.log(data);
    });

// 4.2 查询数据
// 4.2.1 查询所有：
// User.find(function(err, ret) {
//     if (err) {
//         console.log("faIl ", err);
//     };
//     console.log("success!\n", ret)
// })

// 4.2.2 条件查询数据
// User.find({
//     username: 'zs'
// }, function(err, ret) {
//     if (err) {
//         console.log("查询失败", err)
//     } else {
//         console.log("查询成功", ret)
//     };
// });

// 4.2.3 查出的是对象，find()查出的是数组
// User.findOne({ username: 'admin' }, function(err, ret) {
//     if (err) {
//         console.log("查询失败");
//     };
//     console.log("查询成功", ret)
// });

// 4.3 删除数据
// User.remove({ username: 'admin' }, function(err, ret) {
//     if (err) {
//         console.log('fail', err);
//     };
//     console.log("delete success", ret)
// })

// 4.4 更新数据
// User.findByIdAndUpdate('5f0b031985a5a2101c0b0b42', { password: '1111' }, function(err, ret) {
//     if (err) {
//         console.log('update fail', err);
//     };
//     console.log('update success ', ret)
// });