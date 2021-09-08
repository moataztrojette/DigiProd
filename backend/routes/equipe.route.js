const express = require("express");
const router = express.Router();
const { post, findall, serche, deleted,getImage,update,findMembre,findNameUser,deletedMembreListe} = require("../controllers/equipe.c");
//const  {isLogin} = require('../middleware/auth')
router.post("/post", post);
router.get("/findall", findall);
router.get("/serhce/:name", serche);
router.delete("/deleted/:id", deleted);
router.get("/getImage/:idImage", getImage);
router.put('/update/:id',update)
router.get('/finduser/:id',findMembre)
router.get('/findname/:id',findNameUser)


module.exports = router;
