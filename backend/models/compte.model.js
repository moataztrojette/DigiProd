const mongoose = require('mongoose');

const compteSchema = new mongoose.Schema({
     articles : [{ type : mongoose.Types.ObjectId , ref :'articles'}],
     categories :[{ type : mongoose.Types.ObjectId , ref :'categories'}],
     user : { type : mongoose.Types.ObjectId , ref : 'users'  }

     
});

const comptes = mongoose.model('comptes',compteSchema);

module.exports = comptes;
