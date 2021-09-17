const articles = require("../models/article.model");
const location = require("../models/location.model");

module.exports.post = async (req, res) => {
  
  const new_location = new location({
    article: req.body.article,
    empreinteur :req.body.empreinteur,
    contact : req.body.contact,
  });

  if(req.body.empreinteur !="undefined" && req.body.contact!="undefined"){
    await articles.findOneAndUpdate({_id: req.body.article},{
      statut : "reservé",
  },{
      new : true
  })
  }

  await new_location.save()
  const pop = await  location.populate(new_location,{ path : 'article'})

  res.status(200).json(pop);
};
module.exports.findall = async (req, res) => {

    const Article= await location.find().populate('article')
    res.json(Article);
  };


  module.exports.findArticleLocation = async(req,res)=>{
    const resLocation  = await articles.find()
    const  tabLocation= []
  
    for (let pas = 0; pas < resLocation.length; pas++)
    {
      if(resLocation[pas].statut != "dansdepot"){
        tabLocation.push(resLocation[pas])
      }
    }
  
    res.json(tabLocation)
  
    }


    module.exports.serche = async (req, res) => {
      const SercheArt = await articles.find({
        nomArticle: { $regex: req.params.name, $options: "i" },
      }).populate("article");
      res.json(SercheArt);
    };

    module.exports.getImage = async (req, res) => {
      const id = req.params.idImage;
      const resImage = await images.findOne({ ref: id });
      res.setHeader("Content-Type", resImage.type);
      res.send(resImage.body);
    };

    
  module.exports.deleted = async (req, res) => {
    await location.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted");
  };

  module.exports.ArticlesLoués = async (req,res)=>{

  } 

  module.exports.FilteritemsEtatFacture = async (req,res)=>{
    const FilterFacture = await factures.find({
        etatfacture: req.params.name
    }).populate('client')
    res.json(FilterFacture)
  }
