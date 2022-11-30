const express = require('express');
const router = express.Router();
const validation=require('../validation');
const lWords=require('../data/learnedWords');
const user=require('../data/users');

router.get('',async(req,res)=>{
    console.log(req.session.user);
    const getUser=await user.findUser(req.session.user);
    const allWordsL=await lWords.getAllWords(req.session.user);
    if(typeof(getUser.children)==="undefined"){
        //return res.json({username: getUser.username, email: getUser.email});
        return res.render('pages/profile', {username: getUser.username, email: getUser.email,isParent:false,wordsLearned: allWordsL.word,login:true,title:"profile"});
    }
    else{
        //return res.json({username: getUser.username, email: getUser.email, child: getUser.children});
        console.log(getUser.children);
        return res.render('pages/profile', {username: getUser.username, email: getUser.email, child: getUser.children,isParent:true,wordsLearned: allWordsL.word,login:true,title:"profile"});
    }
})

module.exports=router;