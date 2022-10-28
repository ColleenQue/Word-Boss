const express = require('express');
const router = express.Router();
const validation=require('../validation');
const user=require('../data/users');
const { get } = require('./login');

router.get('',async(res,req)=>{
    const getUser=await user.findUser(req.session.user);
    if(getUser.child===null){
        return res.json({username: getUser.username, email: getUser.email});
        //return res.render('pages/profile', {username: getUser.username, email: getUser.email});
    }
    else{
        return res.json({username: getUser.username, email: getUser.email, child: getUser.child});
        //return res.render('pages/profile', {username: getUser.username, email: getUser.email, child: getUser.child});
    }
})

module.exports=router;