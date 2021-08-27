const mongoose = require("mongoose")

const service = new mongoose.Schema({
    nomService : {type:String , required:true},
    description : {type : String ,required:true},
    contact:{type:String,required:true}
})
const services = mongoose.model('services',service)

module.exports = services