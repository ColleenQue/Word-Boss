const express = require('express');
const router = express.Router();
const validation=require('../validation');
const user=require('../data/users');

router.get('',async(req,res)=>{
    console.log(req.session.user);
    const getUser=await user.findUser(req.session.user);
    console.log(getUser);
    if(getUser.children===null){
        //return res.json({username: getUser.username, email: getUser.email});
        return res.render('pages/profile', {username: getUser.username, email: getUser.email,isParent:false,login:true,title:"profile"});
    }
    else{
        //return res.json({username: getUser.username, email: getUser.email, child: getUser.children});
        console.log(getUser.children);
        return res.render('pages/profile', {username: getUser.username, email: getUser.email, child: getUser.children,isParent:true,login:true,title:"profile"});
    }
})

module.exports=router;