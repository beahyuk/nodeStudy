const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const strategySchema = new Schema({
    whiteList: {
        type: Array,
    }
})

const Strategy = mongoose.model('Strategy', strategySchema);

module.exports = { Strategy }