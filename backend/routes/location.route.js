const express = require("express");
const router = express.Router();
const { post, findall,findArticleLocation,serche,getImage,deleted,ArticlesLoués} = require("../controllers/location.c");
//const  {isLogin} = require('../middleware/auth')
router.post("/post", post);
router.get("/findall", findall);
router.get("/find/article/location",findArticleLocation)
router.get("/serche/:name",serche)
router.get("/getImage/:idImage", getImage);
router.delete("/deleted/:id", deleted);
router.get("/loues",ArticlesLoués)


module.exports = router;
