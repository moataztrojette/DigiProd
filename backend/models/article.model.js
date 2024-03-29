const mongoose = require("mongoose");
const article = new mongoose.Schema({
  nomArticle: { type: String },
  categorieArticle: { type: mongoose.Types.ObjectId , ref :'categories' },
  quantite: { type: Number },
  localisation: { type : mongoose.Types.ObjectId , ref : 'depots' },
  statut: { type: String },
  imageArticle : {type:String}
});

const articles = mongoose.model("articles", article);

module.exports = articles;
