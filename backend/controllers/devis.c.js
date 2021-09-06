const { distinct } = require("../models/recu.model")
const devis = require("../models/devis.model")

module.exports.post = async (req,res)=>{
    const newDevis = new devis({
        client : req.body.client,
        description : req.body.description,
        date : req.body.date,
        etatDevis : req.body.etatDevis,
        fichier : req.files.fichier.data,
        typeFile : req.files.fichier.mimetype
    })
    await newDevis.save()
    const pop = await  devis.populate(newDevis,{ path : 'client'})
    res.status(200).send(pop)
}



module.exports.pdf = async(req,res)=>{
    const resPdf = await  devis.findOne({
        _id : req.params.id
    }).select("fichier typeFile")
    res.setHeader("Content-Type",resPdf.typeFile);
    res.send(resPdf.fichier);
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

 


  module.exports.count_entrant = async(req,res)=>
{
    devis.count({ etatDevis: "entrant" },(err, result)=> {
        if (err)
       {
        res.send(err);
        } 
      else {
        res.json(result);
      }
    });
}


module.exports.count_sortant = async(req,res)=>
{
    devis.count({ etatDevis: "sortant" },(err, result)=> {
        if (err)
       {
        res.send(err);
        } 
      else {
        res.json(result);
      }
    });
}
