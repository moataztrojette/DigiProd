const mongoose = require("mongoose")

const freelancer = new mongoose.Schema({
    nom : {type:String,required:true},
    specialite : [{type:String, required:true,trim:true}],
    email : {type:String,reqyured:true},
    fichier : {type:Buffer,required:true},
    typeFile : {type:String,required:true},
    id_user:{type:mongoose.Types.ObjectId , ref:"users"}

})
const freelancers = mongoose.model("freelancers",freelancer)
module.exports = freelancers