const express = require("express");
const router = express.Router();
const { post, findall, serche, deleted,Filteritems,findArticleParCategorie,getImage,FilteritemsDepot} = require("../controllers/articles.c");
//const  {isLogin} = require('../middleware/auth')
const { isLogin } = require("../middleware/auth")

router.post("/post",isLogin,post);
router.get("/findall", findall);
router.get("/serhce/:name", serche);
router.delete("/deleted/:id", deleted);
router.get("/filter/:id",Filteritems);
router.get("/serchearticle/depot/:id",findArticleParCategorie)
router.get("/getImage/:idImage", getImage);
router.get("/filterdepot/:name",FilteritemsDepot)



module.exports = router;
