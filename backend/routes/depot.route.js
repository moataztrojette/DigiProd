const express = require("express")
const router = express.Router()
const {post ,findAll,deleted,getImage } = require("../controllers/depot.c")

router.post('/post',post)
router.get('/findall',findAll)
router.delete('/deleted/:id',deleted)
router.get("/getImage/:idImage", getImage);

module.exports = router