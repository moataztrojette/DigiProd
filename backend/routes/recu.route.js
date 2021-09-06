const express= require("express")
const router = express.Router()
const {post,findall,remove,Filteritems,FilteritemsEtatRecu,findDate,pdf,count_entrant,count_sortant} = require("../controllers/recu.c")


router.post('/post',post)
router.get('/findall',findall)
router.delete('/delete/:id',remove)
router.get('/filter/:date',Filteritems)
router.get('/filter/etatrecu/:name',FilteritemsEtatRecu)
router.get('/finddate',findDate)
router.get('/file/:id',pdf)
router.get('/count/entrant',count_entrant)
router.get('/count/sortant',count_sortant)




module.exports = router