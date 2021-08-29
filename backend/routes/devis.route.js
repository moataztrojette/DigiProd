const express= require("express")
const router = express.Router()
const {post,findall,remove,Filteritems,FilteritemsEtatDevis,findDate,pdf} = require("../controllers/devis.c")


router.post('/post',post)
router.get('/findall',findall)
router.delete('/delete/:id',remove)
router.get('/filter/:date',Filteritems)
router.get('/filter/etatdevis/:name',FilteritemsEtatDevis)
router.get('/finddate',findDate)
router.get('/file/:id',pdf)





module.exports = router