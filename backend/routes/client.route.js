const express= require("express")
const router = express.Router()
const {post,findall,deletedClient,findClientWithId,updateClient} = require("../controllers/clients.c")


router.post('/post',post)
router.get('/findall',findall)
router.delete('/deleted/:id',deletedClient)
router.get('/find/:id',findClientWithId)
router.put('/update/:id',updateClient)

module.exports = router