const bibliotheques = require("../models/bibliotheque.model")
const archives = require("../models/archive.model")


module.exports.post = async (req,res)=>{
  const verife =await  bibliotheques.findOne({description : req.body.description}) 
    if(verife){
        return res.status(422).send("document c déjà ajouté !");
    }
 else{
  const new_bibliotheques = new bibliotheques({
    description : req.body.description,
    date :req.body.date,
    fichier : req.files.fichier.data,
    typeFile : req.files.fichier.mimetype,
    id_user:req.info_user._id

})
await new_bibliotheques.save()

res.status(200).send(new_bibliotheques)
}
 }
   

module.exports.findDate = async(req,res)=>
{
    const resDate = await bibliotheques.find().select('date').distinct('date')
        res.json(resDate)
}

module.exports.Filteritems = async (req,res)=>{
    const FilterDate = await bibliotheques.find({
      date : req.params.date
    })
    res.json(FilterDate)
  }



module.exports.pdf = async(req,res)=>{
    const resPdf = await  bibliotheques.findOne({
        _id : req.params.id
    }).select("fichier typeFile")
    res.setHeader("Content-Type",resPdf.typeFile);
    res.send(resPdf.fichier);
}



  

module.exports.findall = async (req,res)=>
{
    const find = await bibliotheques.find().select('description')
    res.json(find);
}



module.exports.serche = async (req, res) => {
    const SercheBib= await bibliotheques.find({
      description: { $regex: req.params.name, $options: "i" },
    }).select("description")
    res.json(SercheBib);
  };

  module.exports.deleted = async (req, res) => {
    const doc = await bibliotheques.findOne({_id:req.params.id})
    await bibliotheques.findByIdAndDelete({ _id: req.params.id });

    const new_doc = new archives({
      description : doc.description,
      date :doc.date,
      fichier : doc.fichier,
      typeFile : doc.typeFile,
      id_user:doc.id_user

  })
  await new_doc.save()

    res.status(200).send("deleted");

    
  };






