const mongoose = require("mongoose")

const facture  = new mongoose.Schema({
    client : {type:mongoose.Types.ObjectId , ref:"clients" , required:true},
    description : {type :String , required : true},
    date : {type:String,required:true},
    prix : {type:Number,required:true},
    etatfacture : {type:String,required:true},
    fichier : {type:Buffer,required:true},
    typeFile : {type:String,required:true}

})
const factures = mongoose.model("factures",facture)
module.exports = factures