const express= require("express")
const router = express.Router()
const {post,findall,remove,Filteritems,FilteritemsEtatCommande,findDate,pdf} = require("../controllers/commande.c")


router.post('/post',post)
router.get('/findall',findall)
router.delete('/delete/:id',remove)
router.get('/filter/:date',Filteritems)
router.get('/filter/etatcommande/:name',FilteritemsEtatCommande)
router.get('/finddate',findDate)
router.get('/file/:id',pdf)






module.exports = router