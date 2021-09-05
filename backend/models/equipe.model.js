const mongoose = require("mongoose");
const equipe = new mongoose.Schema({
  nomEquipe: { type: String , required:true },
  imageEquipe : {type:String, required:true },
});

const equipes = mongoose.model("equipes", equipe);

module.exports = equipes;
