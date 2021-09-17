const mongoose = require("mongoose");
const location = new mongoose.Schema({
  article: { type: mongoose.Types.ObjectId , ref :'articles' },
  empreinteur : {type:String,},
  contact : {type:String,}
});

const locations = mongoose.model("locations", location);

module.exports = locations;
