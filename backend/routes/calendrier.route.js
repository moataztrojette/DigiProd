const express = require('express')
const router = express.Router()

const {add,findall,removeTache} = require('../controllers/calendrier.c')

router.post('/post',add)
router.get('/findall',findall)
router.delete('/delete/:id',removeTache)


module.exports = router