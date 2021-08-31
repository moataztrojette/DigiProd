const bibliotheques = require("../models/bibliotheque.model")

module.exports.post = async (req,res)=>{
 
 
    const new_bibliotheques = new bibliotheques({
        description : req.body.description,
        date :req.body.date,
        fichier : req.files.fichier.data,
        typeFile : req.files.fichier.mimetype
    })
    await new_bibliotheques.save()

    res.status(200).send(new_bibliotheques)
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








