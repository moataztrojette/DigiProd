    const users = require("../models/user.model")
    var bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken')

    
    module.exports.login = async (req,res) => {
    const {email , password} = req.body 
    const user = await users.findOne({email:email})
    
  
    if(!user){
      return res.status(404).send("Invalid Email or Password")
    }
    
    let passwordIsValid = await bcrypt.compare(password,user.password)
    
    if(user && passwordIsValid){
      const token = jwt.sign({
        _id : user._id,
        nom_entreprise : user.nom_entreprise,
      },process.env.SECURITE,{
        expiresIn : '15d'
      })
  
      req.session.token  = token
      res.json({
  
        _id : user._id,
        nom_entreprise : user.nom_entreprise,
        email : user.email,
        url_espace : user.url_espace,
        langue : user.langue,
        
      });
    }
      else {
        res.status(403).send("Invalid Email or Password")
        
      }
  }


  module.exports.verife = (req,res)=>{
    const token = req.session.token
    jwt.verify(token,process.env.SECURITE,(error,decoded)=>{
      if(error){
        return res.status(403).send('invalid token')
      }
      res.json(decoded)
    })
  }


  module.exports.findall = async (req,res) =>{
    const Allusers = await users.find()
    //console.log(req.info_user)
    res.json(Allusers)
  }

  module.exports.logout = (req,res)=>{
    req.session = null
    res.send('logout')
}

module.exports.post = async (req,res)=>{
    const Hascode = await bcrypt.hash(req.body.password,13)
    const newUser = new users({
      email : req.body.email,
      password : Hascode,
      nom_entreprise :req.body.nom_entreprise,
      url_espace : req.body.url_espace,
      langue :req.body.langue
      })
  
      await newUser.save()
      res.send("User Add");
  }

  module.exports.verifemail = async (req,res)=>{
      const userFind = await users.findOne({email : req.body.email})
      
      if(userFind){
          return res.status(422).send("Le mail est deja utilisé.Essayez un autre nom")
      }
      res.status(200).send("ok")
  }