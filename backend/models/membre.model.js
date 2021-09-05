const mongoose = require("mongoose");
const membre = new mongoose.Schema({
  nomIndividu: { type: String , required:true },
  specialite: { type: String , required:true,trim: true },
  email: { type: String  , required:true },
  tel: { type : String , required:true },
  projet: { type: String  , required:true,trim: true },
  image : {type:String  , required:true}
});

const membres = mongoose.model("membres", membre);

module.exports = membres;
