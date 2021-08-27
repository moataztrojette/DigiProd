const express = require("express");
const router = express.Router();
const {
  post,
  allCategorie,
  getImage,
  deleted,
} = require("../controllers/categorieArticle.c");

router.post("/post", post);
router.get("/findall", allCategorie);
router.delete("/deleted/:id", deleted);
router.get("/getImage/:idImage", getImage);

module.exports = router;
