const articles = require("../models/article.model");
const categories = require("../models/categorieArticle.model")
const images = require("../models/image.model");

module.exports.post = async (req, res) => {
  const verife =await  articles.findOne({nomArticle : req.body.nomArticle}) 
    if(verife){
        return res.status(422).send("Article c déjà ajouté !");
    }
else
{
  const nm = req.files.imageArticle.name;
  const newArticle = new articles({
    nomArticle: req.body.nomArticle,
    categorieArticle: req.body.categorieArticle,
    quantite: req.body.quantite,
    localisation: req.body.localisation,
    statut: req.body.statut,
    imageArticle : nm,
    id_user:req.info_user._id

  });
  await newArticle.save()

  const newImage = new images({
    ref: newArticle._id,
    name: nm,
    body: req.files.imageArticle.data,
    type: req.files.imageArticle.mimetype,
  });
  await newImage.save();

  const pop = await  articles.populate(newArticle,{ path : 'localisation'})
  res.status(200).json(pop);
}
};

module.exports.getImage = async (req, res) => {
  const id = req.params.idImage;
  const resImage = await images.findOne({ ref: id });
  res.setHeader("Content-Type", resImage.type);
  res.send(resImage.body);
};

module.exports.findall = async (req, res) => {

  const allArticle= await articles.find().populate('categorieArticle').populate('localisation')
  res.json(allArticle);



  
};

module.exports.serche = async (req, res) => {
  const SercheArt = await articles.find({
    nomArticle: { $regex: req.params.name, $options: "i" },
  }).populate("localisation");
  res.json(SercheArt);
};



  module.exports.deleted = async (req, res) => {
    await articles.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted");
  };

module.exports.Filteritems = async (req,res)=>{
  const FilterCategorie = await articles.find({
    categorieArticle : req.params.id
  }).populate('localisation')
  res.json(FilterCategorie)
}

module.exports.FilteritemsDepot = async (req,res)=>{
  const resFilter = await articles.find({
    localisation : req.params.name
  }).populate('localisation')
  res.json(resFilter)
}




module.exports.findArticleParCategorie = async(req,res)=>{

  const SercheArticle = await articles.find({
    localisation  : req.params.id
  }).populate('categorieArticle').populate('localisation')
  res.status(200).send(SercheArticle)
}


