const mongoose = require("mongoose")

const devis  = new mongoose.Schema({
    client : {type:mongoose.Types.ObjectId , ref:"clients" , required:true},
    description : {type :String , required : true},
    date : {type:String,required:true},
    file : {type:String,required:true},
    etatDevis : {type:String,required:true}
})
const deviss = mongoose.model("devis",devis)
module.exports = deviss