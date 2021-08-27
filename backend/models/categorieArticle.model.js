const mongoose = require("mongoose");

const categorieArticle = new mongoose.Schema({
  nomCategorie: { type: String, required: true },
  typeCategorie: {
    type: String,
    default: "materiels",
    enum: ["materiels", "services"],
  },
  miniature: { type: String, required: true },
});

const categories = mongoose.model("categories", categorieArticle);
module.exports = categories;
