const mongoose = require("mongoose")

const recu  = new mongoose.Schema({
    nomAgence : {type:String , required:true},
    total : {type :Number , required : true},
    date : {type:String,required:true},
    receveur : {type:String,required:true},
    etatRecu : {type:String,required:true},
    fichier : {type:String,required:true},
})
const recus = mongoose.model("recus",recu)
module.exports = recus