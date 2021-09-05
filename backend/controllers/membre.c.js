const membres = require("../models/membre.model");
const images = require("../models/image.model");

module.exports.post = async (req, res) => {
  
  const nm = req.files.image.name;
  const newMembre = new membres({
    nomIndividu: req.body.nomIndividu,
    specialite : req.body.specialite,
    email : req.body.email,
    tel : req.body.tel,
    projet : req.body.projet,
    image : nm
  });
  await newMembre.save()

  const newImage = new images({
    ref: newMembre._id,
    name: nm,
    body: req.files.image.data,
    type: req.files.image.mimetype,
  });
  await newImage.save();
  res.status(200).json(newMembre);
};

module.exports.getImage = async (req, res) => {
  const id = req.params.idImage;
  const resImage = await images.findOne({ ref: id });
  res.setHeader("Content-Type", resImage.type);
  res.send(resImage.body);
};

module.exports.findall = async (req, res) => {
  const allMembre= await membres.find()
  res.json(allMembre);
};



module.exports.serche = async (req, res) => {
  const SercheMembre= await membres.find({
    nomIndividu: { $regex: req.params.name, $options: "i" },
  })
  res.json(SercheMembre);
};



  module.exports.deleted = async (req, res) => {
    await membres.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted");
  };


  module.exports.update = async (req,res)=>{

    const resUpdate = await membres.findOneAndUpdate({_id:req.params.id},{
      nomIndividu: req.body.nomIndividu,
      specialite : req.body.specialite,
      email : req.body.email,
      tel : req.body.tel,
      projet : req.body.projet,

    },{
        new : true
    })
    res.json(resUpdate)
}
module.exports.FilterSpecialite = async (req,res)=>{
  const FilterSpecialite = await membres.find({
    specialite : req.params.name
  })
  res.json(FilterSpecialite)
}

module.exports.Specialites = async(req,res)=>
{
    const allSpecialite = await membres.find().select('specialite').distinct('specialite')
        res.json(allSpecialite)
}



module.exports.FilterProjet = async (req,res)=>{
  const FilterProjet = await membres.find({
    projet : req.params.name
  })
  res.json(FilterProjet)
}

module.exports.Projet = async(req,res)=>
{
    const allProjet = await membres.find().select('projet').distinct('projet')
        res.json(allProjet)
}
