const freelancers = require("../models/freelancer.model")

module.exports.post = async (req,res)=>{
    const newFreelancer = new freelancers({
        nom : req.body.nom,
        specialite : req.body.specialite,
        fichier : req.files.fichier.data,
        typeFile : req.files.fichier.mimetype
    })
    await newFreelancer.save()
    res.status(200).send(newFreelancer)
}

module.exports.pdf = async(req,res)=>{
    const resPdf = await freelancers.findOne({
        _id : req.params.id
    }).select("fichier typeFile")
    res.setHeader("Content-Type",resPdf.typeFile);
    res.send(resPdf.fichier);
}
module.exports.findall = async (req,res)=>
{
    const find = await freelancers.find()
    res.json(find);
}
module.exports.remove = async (req,res)=>{

    await freelancers.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}


module.exports.findSpecialite = async(req,res)=>
{
    const resSpec = await freelancers.find().select('specialite').distinct('specialite')
        res.json(resSpec)
}


module.exports.Filteritems = async (req,res)=>{
    const Filter = await freelancers.find({
        specialite : req.params.specialite
    })
    res.json(Filter)
  }

  module.exports.serche = async (req, res) => {
    const Serche= await freelancers.find({
      nom: { $regex: req.params.name, $options: "i" },
    })
    res.json(Serche);
  };
