const express = require("express");
const router = express.Router();
const { post, findall,findArticleLocation,update,getImage,deleted,filterArticleLoué,filterArticleNonLoué} = require("../controllers/location.c");
//const  {isLogin} = require('../middleware/auth')
router.post("/post", post);
router.get("/findall", findall);
router.get("/find/article/location",findArticleLocation)
router.get("/getImage/:idImage", getImage);
router.delete("/deleted/:id", deleted);
router.get("/article/loue",filterArticleLoué)
router.get("/article/nonloue",filterArticleNonLoué)
router.put('/update/:id',update)





module.exports = router;
