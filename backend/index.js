
const express = require("express");
const app = express();
const cors = require("cors");
const env = require('dotenv')
const cookieSession = require('cookie-session')
const expressfileupload = require("express-fileupload")




const user = require('./routes/user.route')
const categorieArticle = require("./routes/categorieArticle.route");
const article = require('./routes/article.route')
const depot = require('./routes/depot.route')
const service = require('./routes/service.route')
const client = require('./routes/client.route')
const calendar = require('./routes/calendrier.route')
const recu = require("./routes/recu.route")
const facture = require("./routes/facture.route")
const devis = require("./routes/devis.route")
const commande = require("./routes/commande.route")
const bibliotheque = require("./routes/bibliotheque.route")
const archive = require("./routes/archive.route")
const equipe = require("./routes/equipe.route")
const membre  =require("./routes/membre.route")
const freelancer = require("./routes/freelancer.route")
const location = require("./routes/location.route")

const { use } = require("./routes/categorieArticle.route");
env.config()
app.use(cors({ origin: "http://localhost:3000",credentials:true }));

app.use(express.json());

app.use(cookieSession({
  name : 'DGC',
  keys : ['DGC_key'],
  //maxAge 
}))
app.use(expressfileupload({

}))
require('./DB/setup')()

app.use('/api/user',user)
app.use('/api/categorie',categorieArticle)
app.use('/api/article',article)
app.use('/api/depot',depot)
app.use('/api/service',service)
app.use('/api/client',client)
app.use('/api/calendar',calendar)
app.use('/api/recu',recu)
app.use('/api/facture',facture)
app.use('/api/devis',devis)
app.use('/api/commande',commande)
app.use('/api/bibliotheque',bibliotheque)
app.use('/api/archive',archive)
app.use('/api/equipe',equipe)
app.use('/api/membre',membre)
app.use('/api/freelancer',freelancer)
app.use('/api/location',location)



app.listen(4000, () => {
    console.log("Listening on port 4000");
  });








