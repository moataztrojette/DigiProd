const jwt = require("jsonwebtoken")
const users = require("../models/user.model")
const  bcrypt = require('bcryptjs');
module.exports.isLogin = async (req,res,next)=>{
    
    const token = req.session.token
    jwt.verify(token,process.env.SECURITE,(error,decoded)=>{
      if(error){
        return res.status(403).send('invalid token')
      }
      req.user = decoded
      next()
    })

}

module.exports.passwordValid = async (req,res,next)=>{

    const password = req.body.password
        if(!password){
            return res.status(403).send("Invalid password")
        }

        const user = await users.findOne({_id : req.info_user._id})
        const isValidpassword = await bcrypt.compare(password , user.password)

        if(!isValidpassword){
            return res.status(403).send("invalid password")  
        }
        
        next()
}