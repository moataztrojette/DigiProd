const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
     example:{type:String}
});

const test = mongoose.model('test',testSchema);

module.exports = test;
