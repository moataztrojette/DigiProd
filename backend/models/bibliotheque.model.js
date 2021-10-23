const mongoose = require("mongoose")

const bibliotheque  = new mongoose.Schema({
    description : {type :String , required : true},
    date : {type:String,required:true},
    fichier : {type:Buffer,required:true},
    typeFile : {type:String,required:true},
    id_user:{type:mongoose.Types.ObjectId , ref:"users"}

})
const bibliotheques = mongoose.model("bibliotheques",bibliotheque)
module.exports = bibliotheques