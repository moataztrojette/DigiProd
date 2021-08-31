const mongoose = require("mongoose")

const archive  = new mongoose.Schema({
    description : {type :String , required : true},
    date : {type:String,required:true},
    fichier : {type:Buffer,required:true},
    typeFile : {type:String,required:true}
})
const archives = mongoose.model("archives",archive)
module.exports = archives