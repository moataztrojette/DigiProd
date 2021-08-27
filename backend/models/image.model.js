const mongoose = require("mongoose")
//image
const image = new mongoose.Schema({
    
    ref : {type : mongoose.Types.ObjectId, ref : 'categories'},
    name : {type:String , required : true },
    body : {type:Buffer,required : true},
    type : {type:String, required:true}
})

const images = mongoose.model("images",image)

module.exports = images