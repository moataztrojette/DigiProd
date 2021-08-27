const articles = require("../models/article.model");
const users = require("../models/user.model");
const comptes = require("../models/compte.model");

module.exports.post = async (req, res) => {
  const newArticle = new articles({
    nomArticle: req.body.nomArticle,
    categorieArticle: req.body.categorieArticle,
    quantite: req.body.quantite,
    localisation: req.body.localisation,
    statut: req.body.statut,

  });

  
  await Promise.all([
    comptes.findOneAndUpdate({user : req.user._id},{
      $push : {
        articles : newArticle._id
      }
    }),
    newArticle.save()
  ])
  
  res.status(200).json(newArticle);
};
module.exports.findall = async (req, res) => {


  const allArticle= await comptes.findOne({
    user : req.user._id
}).select('articles').populate('articles');
res.json(allArticle.articles);



  
};

module.exports.serche = async (req, res) => {
  const SercheArt = await articles.find({
    nomArticle: { $regex: req.params.name, $options: "i" },
  });
  res.json(SercheArt);
};
module.exports.deleted = async (req, res) => {
  await Promise.all([
    comptes.findOneAndUpdate({
      user : req.user._id
    }, {
      $pull : {
        articles : req.params.id
      }
    }),
    articles.findByIdAndDelete({ _id: req.params.id })
  ])
  


  res.status(200).send("deleted");
};
