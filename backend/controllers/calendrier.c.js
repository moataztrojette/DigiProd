const calendriers = require('../models/calendrier.model')


module.exports.add = async (req,res)=>{
    const new_calendrier = new calendriers({
        title : req.body.title,
        start : req.body.start,
        end: req.body.end,
        pourcentage : req.body.pourcentage,
        heureDebut : req.body.heureDebut,
        heureFin : req.body.heureFin
    })
    await new_calendrier.save()
    res.status(200).send(new_calendrier)
}

module.exports.findall = async (req,res)=>{
    const calendrier = await calendriers.find();
    res.status(200).send(calendrier)
}


module.exports.removeTache = async (req,res)=>{
    await calendriers.findByIdAndDelete({_id:req.params.id});
    res.status(200).send("deleted")
}

