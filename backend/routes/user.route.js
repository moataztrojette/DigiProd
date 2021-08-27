const express = require('express');
const { login,verife,findall,logout,post,verifemail } = require('../controllers/user.c');
const router = express.Router()
const {isLogin,passwordValid} = require('../middleware/auth')

  router.post("/post",post);
  router.get("/findall",findall)
  router.post('/login',login)
  router.get('/verif',verife)
  router.post('/logout',logout)
  router.post('/verifemail',verifemail)

  
module.exports = router



  
