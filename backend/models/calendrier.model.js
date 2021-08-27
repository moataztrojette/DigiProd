const mongoose = require("mongoose");

const calendrier = new mongoose.Schema({
    title : {type:String,required:true},
    start :{type:String , required:true},
    end :{type:String,required:true},
    pourcentage : {type: Number , required:true},
    heureDebut : {type: String , required:true},
    heureFin : {type: String , required:true},
})
const calendriers = mongoose.model('calendriers',calendrier)
module.exports = calendriers;
