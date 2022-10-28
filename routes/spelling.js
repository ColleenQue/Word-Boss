const express = require('express');
const router = express.Router();
const validation=require('../validation');
const user=require('../data/users');

router.get('', async (req, res) => {

    res.render('pages/spelling', {});

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
      res.status(400).render('pages/spelling', { err: true, message: e ,title:"Log in"});
      return;
    }
  
  
    if (result.authenticated === true) {
        
      res.render('pages/spelling', {login:true});
  
    }
    else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  
  })


module.exports = router;
