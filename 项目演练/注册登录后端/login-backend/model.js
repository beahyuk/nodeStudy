const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs")
mongoose.set('useCreateIndex', true)

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        // set(val) {
        //     const salt = bcrypt.genSaltSync(10);
        //     const psw = bcrypt.hashSync(val, salt);
        //     // this.setDataValue('password', psw)
        //     return psw
        // }
    }
})
const User = mongoose.model("User", userSchema)

module.exports = { User }