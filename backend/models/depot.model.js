const mongoose = require("mongoose")

const depot = new mongoose.Schema({
    nomDepot : {type:String, required:true },
    localisation : {type:String ,  required : true},
    responsable : {type:String , required:true},
    imageDepot :  {type:String , required:true},
})

const depots = mongoose.model("depots",depot)

module.exports = depots