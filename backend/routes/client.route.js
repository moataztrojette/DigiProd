const express= require("express")
const router = express.Router()

const {post,findall,deletedClient,findClientWithId,updateClient} = require("../controllers/clients.c")
const { isLogin } = require("../middleware/auth")


router.post('/post',isLogin,post)
router.get('/findall',findall)
router.delete('/deleted/:id',deletedClient)
router.get('/find/:id',findClientWithId)
router.put('/update/:id',updateClient)

module.exports = router