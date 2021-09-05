const express = require("express");
const router = express.Router();
const { post, findall, serche, deleted,getImage,update,FilterSpecialite,Specialites,FilterProjet,Projet} = require("../controllers/membre.c");
router.post("/post", post);
router.get("/findall", findall);
router.get("/serhce/:name", serche);
router.delete("/deleted/:id", deleted);
router.get("/getImage/:idImage", getImage);
router.get("/filter/:name", FilterSpecialite);
router.get("/specialite", Specialites);
router.get("/filterprojet/:name", FilterProjet);
router.get("/projet",Projet);
router.put('/update/:id',update)

module.exports = router;
