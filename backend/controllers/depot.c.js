const articles = require("../models/article.model");
const depots =require("../models/depot.model")
const images = require("../models/image.model");




module.exports.post = async (req,res)=>{

    const verife =await  depots.findOne({nomDepot : req.body.nomDepot}) 
    if(verife){
        return res.status(422).send("Dépot c déjà ajouté !");
    }
    else{
        const nm = req.files.imageDepot.name;

        const newDepot  = new depots({
            nomDepot : req.body.nomDepot,
            localisation : req.body.localisation,
            responsable : req.body.responsable,
            imageDepot : nm 
        })
        await newDepot.save()
        const newImage = new images({
            ref: newDepot._id,
            name: nm,
            body: req.files.imageDepot.data,
            type: req.files.imageDepot.mimetype,
          });
          await newImage.save();


        res.status(200).json(newDepot);
    }
   
}
module.exports.getImage = async (req, res) => {
    const id = req.params.idImage;
    const resImage = await images.findOne({ ref: id });
    res.setHeader("Content-Type", resImage.type);
    res.send(resImage.body);
  };

module.exports.findAll = async (req,res)=>{
    const Alldepots = await depots.find()
    res.json(Alldepots)

}

module.exports.deleted = async (req,res)=>{

    await articles.deleteMany({localisation :req.params.id })
    await depots.findByIdAndRemove({_id : req.params.id})
    res.status(200).send("deleted")
}