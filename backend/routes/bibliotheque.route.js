const express = require('express')
const router = express.Router()

const {post,pdf,findall,findDate,Filteritems,serche,deleted} = require('../controllers/bibliotheque.c')

router.post('/post',post)
router.get('/findall',findall)
router.get('/finddate',findDate)
router.get('/filter/:date',Filteritems)
router.get("/serhce/:name", serche);
router.delete("/deleted/:id", deleted);

router.get('/file/:id',pdf)




module.exports = router