const articles = require("../models/article.model");
const location = require("../models/location.model");

module.exports.post = async (req, res) => {
  
  const verife =await  location.findOne({
    article : req.body.article
})
if(verife){
    return res.status(422).send(" c déjà loué ")
}
else{

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
}

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


    

    module.exports.getImage = async (req, res) => {
      const id = req.params.idImage;
      const resImage = await images.findOne({ ref: id });
      res.setHeader("Content-Type", resImage.type);
      res.send(resImage.body);
    };

    
  module.exports.deleted = async (req, res) => {
    
    const art = await location.findOne({_id:req.params.id})

    await location.findByIdAndDelete({ _id: req.params.id });  
    await articles.findOneAndUpdate({_id:art.article},{
      statut : "enlocation",
  },{
      new : true
  })

    res.status(200).send("deleted");
  };

 

  module.exports.filterArticleLoué = async (req,res)=>{
    const tab =[]
    const resArt = await location.find().populate('article')

    for (let pas = 0; pas < resArt.length; pas++)
    {
      if(resArt[pas].article.statut == "reservé"){
        tab.push(resArt[pas])
      }
    }
    
    res.json(tab)
  }


  module.exports.filterArticleNonLoué = async (req,res)=>{
    const tab =[]
    const resArt = await location.find().populate('article')

    for (let pas = 0; pas < resArt.length; pas++)
    {
      if(resArt[pas].article.statut == "enlocation"){
        tab.push(resArt[pas])
      }
    }
    
    res.json(tab)
  }

  module.exports.update = async (req,res)=>{
    const resUpdate = await location.findOneAndUpdate({_id:req.params.id},{
      empreinteur : req.body.empreinteur,
      contact : req.body.contact
    },{
        new : true
    }).populate('article')

     await articles.findOneAndUpdate({_id:resUpdate.article},{
      statut : "reservé",
    },{
        new : true
    }).populate('article')
    
    res.json(resUpdate)
}

