
const mongoose = require("mongoose")
//users
const user = new mongoose.Schema({
    email : {type :String ,unique:true},
    password : {type : String},
    nom_entreprise : {type : String},
    url_espace : {type : String},
    langue : {type : String  , default: "francais",
    enum: ["francais", "anglais", "arabe"]}
})

const users = mongoose.model("users",user)

module.exports = users