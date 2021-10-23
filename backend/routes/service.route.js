const express= require("express")
const router = express.Router()
const  {post,findall,deletedservice,findServiceWithId,updateService} = require("../controllers/service.c")
const { isLogin } = require("../middleware/auth")


router.post('/post',isLogin,post)
router.get('/findall',findall)
router.delete('/deleted/:id',deletedservice)
router.get('/find/:id',findServiceWithId)
router.put('/update/:id',updateService)

module.exports = router