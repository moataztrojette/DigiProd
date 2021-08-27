const express = require("express");
const router = express.Router();
const { post, findall, serche, deleted } = require("../controllers/articles.c");
const  {isLogin} = require('../middleware/auth')
router.use(isLogin)
router.post("/post", post);
router.get("/findall", findall);
router.get("/serhce/:name", serche);
router.delete("/deleted/:id", deleted);

module.exports = router;
