const express= require("express")
const router = express.Router()
const {post,findall,remove,Filteritems,FilteritemsEtatRecu,findDate,pdf} = require("../controllers/recu.c")


router.post('/post',post)
router.get('/findall',findall)
router.delete('/delete/:id',remove)
router.get('/filter/:date',Filteritems)
router.get('/filter/etatrecu/:name',FilteritemsEtatRecu)
router.get('/finddate',findDate)
router.get('/file/:id',pdf)





module.exports = router