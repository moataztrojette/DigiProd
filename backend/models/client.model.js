const mongoose = require("mongoose")

const client = new mongoose.Schema({
    nomSociete : {type:String , required:true},
    adresseEmail : {type : String ,required:true, unique:true},
    telephone:{type:Number,required:true},
    id_user:{type:mongoose.Types.ObjectId , ref:"users"}
})
const clients = mongoose.model('clients',client)

module.exports = clients
