const express = require('express')
const router = express.Router()

const {post,pdf,findall,findDate,Filteritems} = require('../controllers/archive.c')

router.post('/post',post)
router.get('/findall',findall)
router.get('/finddate',findDate)
router.get('/filter/:date',Filteritems)

router.get('/file/:id',pdf)




module.exports = router