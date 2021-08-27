const services = require("../models/service.model")

module.exports.post = async (req,res)=>{
    const verife =await  services.findOne({
        contact : req.body.contact
    })
    if(verife){
        return res.status(422).send("Email c déjà ajouté ")
    }
    const newService = new services({
        nomService : req.body.nomService,
        description : req.body.description,
        contact : req.body.contact
    })
    await newService.save()
    res.status(200).send(newService)
}

module.exports.findall = async (req,res)=>
{
    const find = await services.find()
    res.json(find);
}

module.exports.deletedservice = async (req,res)=>{

    await services.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}

module.exports.findServiceWithId  = async(req,res)=>{

    const resService = await services.findById({_id:req.params.id})
    res.json(resService)
}

module.exports.updateService = async (req,res)=>{

    const resUpdate = await services.findOneAndUpdate({_id:req.params.id},{
        nomService : req.body.nomService,
        description : req.body.description,
    },{
        new : true
    })
    res.json(resUpdate)
}
