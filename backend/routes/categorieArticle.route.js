const express = require("express");
const router = express.Router();
const {
  post,
  allCategorie,
  getImage,
  deleted,
} = require("../controllers/categorieArticle.c");
const  {isLogin} = require('../middleware/auth')

router.post("/post",isLogin,post);
router.get("/findall",isLogin, allCategorie);
router.delete("/deleted/:id",isLogin, deleted);
router.get("/getImage/:idImage", getImage);

module.exports = router;
