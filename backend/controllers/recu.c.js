const { distinct } = require("../models/recu.model")
const recus = require("../models/recu.model")

module.exports.post = async (req,res)=>{
 
 
    const newrecu = new recus({
        nomAgence : req.body.nomAgence,
        total : req.body.total,
        date : req.body.date,
        receveur : req.body.receveur,
        etatRecu : req.body.etatRecu,
        fichier : req.files.fichier.data,
        typeFile : req.files.fichier.mimetype
    })
    await newrecu.save()
    res.status(200).send(newrecu)
}


module.exports.pdf = async(req,res)=>{
    const resPdf = await  recus.findOne({
        _id : req.params.id
    }).select("fichier typeFile")
    res.setHeader("Content-Type",resPdf.typeFile);
    res.send(resPdf.fichier);
}


module.exports.findall = async (req,res)=>
{
    const find = await recus.find()
    res.json(find);
}

module.exports.findDate = async(req,res)=>
{
    const resDate = await recus.find().select('date').distinct('date')
        res.json(resDate)
}

module.exports.remove = async (req,res)=>{

    await recus.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}

module.exports.Filteritems = async (req,res)=>{
    const FilterDate = await recus.find({
      date : req.params.date
    })
    res.json(FilterDate)
  }

  
  module.exports.FilteritemsEtatRecu = async (req,res)=>{
    const FilterEntrant = await recus.find({
        etatRecu : req.params.name
    })
    res.json(FilterEntrant)
  }

 


