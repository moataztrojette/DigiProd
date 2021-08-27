const { distinct } = require("../models/recu.model")
const commandes = require("../models/commande.model")

module.exports.post = async (req,res)=>{
 
 
    const newCommande = new commandes({
        client : req.body.client,
        description : req.body.description,
        date : req.body.date,
        etatCommande : req.body.etatCommande,
        file : req.body.file
    })
    await newCommande.save()
    const pop = await  commandes.populate(newCommande,{ path : 'client'})

    res.status(200).send(pop)
}


module.exports.findall = async (req,res)=>
{
    const find = await commandes.find().populate('client')
    res.json(find);
}

module.exports.findDate = async(req,res)=>
{
    const resDate = await commandes.find().select('date').distinct('date')
        res.json(resDate)
}

module.exports.remove = async (req,res)=>{

    await commandes.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}

module.exports.Filteritems = async (req,res)=>{
    const FilterDate = await commandes.find({
      date : req.params.date
    }).populate('client')
    res.json(FilterDate)
  }

  
  module.exports.FilteritemsEtatCommande = async (req,res)=>{
    const FilterCommande = await commandes.find({
        etatCommande: req.params.name
    }).populate('client')
    res.json(FilterCommande)
  }

 


