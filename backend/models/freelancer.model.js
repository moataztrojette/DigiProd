const mongoose = require("mongoose")

const freelancer = new mongoose.Schema({
    nom : {type:String,required:true},
    specialite : [{type:String, required:true,trim:true}],
    fichier : {type:Buffer,required:true},
    typeFile : {type:String,required:true}
})
const freelancers = mongoose.model("freelancers",freelancer)
module.exports = freelancers