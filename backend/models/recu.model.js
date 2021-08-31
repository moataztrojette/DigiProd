const mongoose = require("mongoose")

const recu  = new mongoose.Schema({
    nomAgence : {type:mongoose.Types.ObjectId , ref:"clients" , required:true},
    total : {type :Number , required : true},
    date : {type:String,required:true},
    receveur : {type:mongoose.Types.ObjectId , ref:"depots" , required:true},
    etatRecu : {type:String,required:true},
    fichier : {type:Buffer,required:true},
    typeFile : {type:String,required:true}

    
})
const recus = mongoose.model("recus",recu)
module.exports = recus