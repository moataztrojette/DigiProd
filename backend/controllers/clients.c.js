const clients = require("../models/client.model")
const factures = require("../models/facture.model")
const devis = require("../models/devis.model")
const recu = require("../models/recu.model")
const commande = require("../models/commande.model")


module.exports.post = async (req,res)=>{
    const verife =await  clients.findOne({
        adresseEmail : req.body.adresseEmail
    })
    if(verife){
        return res.status(422).send("Email c déjà ajouté ")
    }
    const newClient = new clients({
        nomSociete : req.body.nomSociete,
        adresseEmail : req.body.adresseEmail,
        telephone : req.body.telephone
    })
    await newClient.save()
    res.status(200).send(newClient)
}

module.exports.findall = async (req,res)=>
{
    const find = await clients.find()
    res.json(find);
}

module.exports.deletedClient = async (req,res)=>{
    await factures.deleteMany({client:req.params.id})
    await devis.deleteMany({client:req.params.id})
    await commande.deleteMany({client:req.params.id})
    await recu.deleteMany({nomAgence : req.params.id})
    
    await clients.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}

module.exports.findClientWithId  = async(req,res)=>{

    const resClient = await clients.findById({_id:req.params.id})
    res.json(resClient)
}

module.exports.updateClient = async (req,res)=>{
    const resUpdate = await clients.findOneAndUpdate({_id:req.params.id},{
        nomSociete : req.body.nomSociete,
        telephone : req.body.telephone
    },{
        new : true
    })
    res.json(resUpdate)
}
