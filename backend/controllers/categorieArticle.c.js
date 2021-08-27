const categories = require("../models/categorieArticle.model");
const images = require("../models/image.model");
const fs = require("fs");
const articles = require("../models/article.model");
const users = require("../models/user.model");
const comptes = require("../models/compte.model");



module.exports.post = async (req, res) => {
  const verife = await categories.findOne({
    nomCategorie: req.body.nomCategorie,
  });
  if (verife) {
    return res.status(422).send("Catégorie c déjà ajouté !");
  } 
    const nm = req.files.miniature.name;
    const categorie = new categories({
      nomCategorie: req.body.nomCategorie,
      typeCategorie: req.body.typeCategorie,
      miniature: nm,
    });
   
    const newImage = new images({
      ref: categorie._id,
      name: nm,
      body: req.files.miniature.data,
      type: req.files.miniature.mimetype,
    });
    await Promise.all([
      comptes.findOneAndUpdate({user : req.user._id},{
        $push : {
          categories : categorie._id
        }
      }),
       categorie.save(),
      newImage.save()
    ])
  

    res.json(categorie);
  
};

module.exports.deleted = async (req, res) => {
  await articles.deleteMany({categorieArticle:req.params.id})
  await categories.findByIdAndDelete({ _id: req.params.id });


  await comptes.findOneAndUpdate({
    user : req.user._id
  }, {
    $pull : {
      categories : req.params.id
    }
  })


  res.status(200).send("deleted");
};

module.exports.allCategorie = async (req, res) => {
  const allCategorie = await comptes.findOne({
        user : req.user._id
  }).select('categories').populate('categories');
  res.json(allCategorie.categories);
};

module.exports.getImage = async (req, res) => {
  const id = req.params.idImage;
  const resImage = await images.findOne({ ref: id });
  res.setHeader("Content-Type", resImage.type);
  res.send(resImage.body);
};
