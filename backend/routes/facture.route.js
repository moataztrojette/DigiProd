const express= require("express")
const router = express.Router()
const {post,findall,remove,Filteritems,FilteritemsEtatFacture,findDate,pdf} = require("../controllers/facture.c")


router.post('/post',post)
router.get('/findall',findall)
router.delete('/delete/:id',remove)
router.get('/filter/:date',Filteritems)
router.get('/filter/etatfacture/:name',FilteritemsEtatFacture)
router.get('/finddate',findDate)
router.get('/file/:id',pdf)





module.exports = router