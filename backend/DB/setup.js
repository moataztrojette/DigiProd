
const mongoose = require("mongoose")


module.exports = ()=>{
    mongoose.connect("mongodb://localhost/DigiProd", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
      if (err) throw err;
      console.log("Connected to db");
    }
    );
}

