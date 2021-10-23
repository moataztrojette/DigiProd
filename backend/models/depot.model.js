const mongoose = require("mongoose")

const depot = new mongoose.Schema({
    nomDepot : {type:String, required:true },
    localisation : {type:String ,  required : true},
    responsable : {type: mongoose.Types.ObjectId , ref :'membres'},
    imageDepot :  {type:String , required:true},
    id_user:{type:mongoose.Types.ObjectId , ref:"users"}

})

const depots = mongoose.model("depots",depot)

module.exports = depots