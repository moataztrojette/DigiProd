const archives = require("../models/archive.model")

module.exports.post = async (req,res)=>{
 
 
    const new_archives = new archives({
        description : req.body.description,
        date :req.body.date,
        fichier : req.files.fichier.data,
        typeFile : req.files.fichier.mimetype
    })
    await new_archives.save()

    res.status(200).send(new_archives)
}

module.exports.findDate = async(req,res)=>
{
    const resDate = await archives.find().select('date').distinct('date')
        res.json(resDate)
}

module.exports.Filteritems = async (req,res)=>{
    const FilterDate = await archives.find({
      date : req.params.date
    })
    res.json(FilterDate)
  }



module.exports.pdf = async(req,res)=>{
    const resPdf = await  archives.findOne({
        _id : req.params.id
    }).select("fichier typeFile")
    res.setHeader("Content-Type",resPdf.typeFile);
    res.send(resPdf.fichier);
}



  

module.exports.findall = async (req,res)=>
{
    const find = await archives.find()
    res.json(find);
}


module.exports.serche = async (req, res) => {
    const SercheArch= await archives.find({
      description: { $regex: req.params.name, $options: "i" },
    }).select("description")
    res.json(SercheArch);
  };


  
  module.exports.deleted = async (req, res) => {
    await archives.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted");
  };








