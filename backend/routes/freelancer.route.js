const express= require("express")
const router = express.Router()
const {post,findall,remove,Filteritems,findSpecialite,pdf,serche} = require("../controllers/freelancer.c")
const { isLogin } = require("../middleware/auth")


router.post('/post',isLogin,post)
router.get('/findall',findall)
router.delete('/delete/:id',remove)
router.get('/filter/:specialite',Filteritems)
router.get('/findspecialite',findSpecialite)
router.get('/file/:id',pdf)
router.get("/serche/:name", serche);



module.exports = router