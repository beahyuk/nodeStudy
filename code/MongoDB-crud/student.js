var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/itcast");

var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Student', studentSchema);