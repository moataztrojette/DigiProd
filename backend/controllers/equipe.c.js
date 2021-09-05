const equipes = require("../models/equipe.model");
const images = require("../models/image.model");

module.exports.post = async (req, res) => {
  
  const nm = req.files.imageEquipe.name;
  const newEquipes = new equipes({
    nomEquipe: req.body.nomEquipe,
    imageEquipe : nm
  });
  await newEquipes.save()

  const newImage = new images({
    ref: newEquipes._id,
    name: nm,
    body: req.files.imageEquipe.data,
    type: req.files.imageEquipe.mimetype,
  });
  await newImage.save();
  res.status(200).json(newEquipes);
};

module.exports.getImage = async (req, res) => {
  const id = req.params.idImage;
  const resImage = await images.findOne({ ref: id });
  res.setHeader("Content-Type", resImage.type);
  res.send(resImage.body);
};

module.exports.findall = async (req, res) => {
  const allEquipe= await equipes.find()
  res.json(allEquipe);
};



module.exports.serche = async (req, res) => {
  const SercheEquipe= await equipes.find({
    nomEquipe: { $regex: req.params.name, $options: "i" },
  })
  res.json(SercheEquipe);
};



  module.exports.deleted = async (req, res) => {
    await equipes.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send("deleted");
  };







