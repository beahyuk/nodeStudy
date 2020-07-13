var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/itcast", { useNewUrlParser: true, useUnifiedTopology: true });

var Schema = mongoose.Schema;
// 设计文档结构
var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    hobbies: {
        type: String
    }
});
// 将文档结构发布为一个模型
module.exports = mongoose.model('Student', studentSchema);