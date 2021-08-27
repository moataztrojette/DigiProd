const { distinct } = require("../models/recu.model")
const factures = require("../models/facture.model")

module.exports.post = async (req,res)=>{
 
 
    const newFacture = new factures({
        client : req.body.client,
        description : req.body.description,
        date : req.body.date,
        prix : req.body.prix,
        etatfacture : req.body.etatfacture,
        file : req.body.file
    })
    await newFacture.save()
    const pop = await  factures.populate(newFacture,{ path : 'client'})

    res.status(200).send(pop)
}


module.exports.findall = async (req,res)=>
{
    const find = await factures.find().populate('client')
    res.json(find);
}

module.exports.findDate = async(req,res)=>
{
    const resDate = await factures.find().select('date').distinct('date')
        res.json(resDate)
}

module.exports.remove = async (req,res)=>{

    await factures.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}

module.exports.Filteritems = async (req,res)=>{
    const FilterDate = await factures.find({
      date : req.params.date
    }).populate('client')
    res.json(FilterDate)
  }

  
  module.exports.FilteritemsEtatFacture = async (req,res)=>{
    const FilterFacture = await factures.find({
        etatfacture: req.params.name
    }).populate('client')
    res.json(FilterFacture)
  }

 


