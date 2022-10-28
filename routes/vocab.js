const express = require('express');
const router = express.Router();
const validation=require('../validation');
const user=require('../data/users');

router.get('', async (req, res) => {

    res.render('pages/vocab', {});

});

router.post('', async (req, res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    let result;
    try {
      password = validation.checkPassWord(req.body.password);
      username = validation.checkUserName(req.body.username);
      result = await user.checkUser(username, password);
    }
    catch (e) {
      res.status(400).render('pages/vocab', { err: true, message: e ,title:"Vocab"});
      return;
    }
  
  
    if (result.authenticated === true) {
      
      res.render('pages/vocab', {login:true});
  
    }
    else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  
  })


module.exports = router;
