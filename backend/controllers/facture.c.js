const { distinct } = require("../models/recu.model")
const factures = require("../models/facture.model")

module.exports.post = async (req,res)=>{
    const newFacture = new factures({
        client : req.body.client,
        description : req.body.description,
        date : req.body.date,
        prix : req.body.prix,
        etatfacture : req.body.etatfacture,
        fichier : req.files.fichier.data,
        typeFile : req.files.fichier.mimetype
    })
    await newFacture.save()
    const pop = await  factures.populate(newFacture,{ path : 'client'})

    res.status(200).send(pop)
}


module.exports.pdf = async(req,res)=>{
    const resPdf = await factures.findOne({
        _id : req.params.id
    }).select("fichier typeFile")
    res.setHeader("Content-Type",resPdf.typeFile);
    res.send(resPdf.fichier);
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

  module.exports.findPrice = async (req,res)=>
{
    

    const fact = await factures.distinct("date")
    const serchePrix = await factures.find({ 
        etatfacture : "entrant",
        date : {
            $in:fact
        }
    }).select("prix date -_id")
    
    let ob = {}
    for (let i=0;i<fact.length;i++){
        let max = -1;
        for (let j=0;j<serchePrix.length;j++){
            
            if(fact[i] === serchePrix[j].date ){

            

            if(ob[fact[i]]){
            
                if(serchePrix[j].prix>max){
                    max = serchePrix[j].prix
                    ob[fact[i]] = max
                }       
            }
            else{
                max = serchePrix[j].prix
                ob[fact[i]] = max
            }
            //console.log(fact[i] , " : " , serchePrix[j])
        }
    }   
    }   


    res.json(ob)
    
}


module.exports.findPriceSortant = async (req,res)=>
{
    

    const fact = await factures.distinct("date")
    const serchePrix = await factures.find({ 
        etatfacture : "sortant",
        date : {
            $in:fact
        }
    }).select("prix date -_id")
    
    let ob = {}
    for (let i=0;i<fact.length;i++){
        let max = -1;
        for (let j=0;j<serchePrix.length;j++){
            
            if(fact[i] === serchePrix[j].date ){

            

            if(ob[fact[i]]){
            
                if(serchePrix[j].prix>max){
                    max = serchePrix[j].prix
                    ob[fact[i]] = max
                }       
            }
            else{
                max = serchePrix[j].prix
                ob[fact[i]] = max
            }
            //console.log(fact[i] , " : " , serchePrix[j])
        }
    }   
    }   


    res.json(ob)
    
}



module.exports.count = async(req,res)=>
{
    factures.count({ etatfacture: "entrant" },(err, result)=> {
        if (err)
       {
        res.send(err);
        } 
      else {
        res.json(result);
      }
    });
}


module.exports.count_facture_sortant = async(req,res)=>
{
    factures.count({ etatfacture: "sortant" },(err, result)=> {
        if (err)
       {
        res.send(err);
        } 
      else {
        res.json(result);
      }
    });
}




 


