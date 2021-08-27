const mongoose = require("mongoose")

const commande  = new mongoose.Schema({
    client : {type:mongoose.Types.ObjectId , ref:"clients" , required:true},
    description : {type :String , required : true},
    date : {type:String,required:true},
    etatCommande : {type:String,required:true},
    file : {type:String,required:true}
})
const commandes = mongoose.model("commandes",commande)
module.exports = commandes