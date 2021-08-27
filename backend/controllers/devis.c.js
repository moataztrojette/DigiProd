const { distinct } = require("../models/recu.model")
const devis = require("../models/devis.model")

module.exports.post = async (req,res)=>{
 
 
    const newDevis = new devis({
        client : req.body.client,
        description : req.body.description,
        date : req.body.date,
        file : req.body.file,
        etatDevis : req.body.etatDevis
    })
    await newDevis.save()
    const pop = await  devis.populate(newDevis,{ path : 'client'})

    res.status(200).send(pop)
}


module.exports.findall = async (req,res)=>
{
    const find = await devis.find().populate('client')
    res.json(find);
}

module.exports.findDate = async(req,res)=>
{
    const resDate = await devis.find().select('date').distinct('date')
        res.json(resDate)
}

module.exports.remove = async (req,res)=>{

    await devis.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}

module.exports.Filteritems = async (req,res)=>{
    const FilterDate = await devis.find({
      date : req.params.date
    }).populate('client')
    res.json(FilterDate)
  }

  
  module.exports.FilteritemsEtatDevis = async (req,res)=>{
    const FilterDevis = await devis.find({
        etatDevis: req.params.name
    }).populate('client')
    res.json(FilterDevis)
  }

 


