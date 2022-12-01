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
        if(allWordsL==null){
            return res.render('pages/profile', {username: getUser.username, email: getUser.email,isParent:false,learned:false,login:true,correct: getUser.correct,title:"profile"});
        }else{
            return res.render('pages/profile', {username: getUser.username, email: getUser.email,isParent:false,learned:true,wordsLearned: allWordsL.word,login:true,correct: getUser.correct,title:"profile"});
        }
    }
    else{
        //return res.json({username: getUser.username, email: getUser.email, child: getUser.children});
        let childNames=[];
        for(let i=0;i<getUser.children.length;i++){
            childNames.push(getUser.children[i].username);
        }
        let childLearned=[];
        for(let j=0;j<childNames.length;j++){
            let theWordsL=await lWords.getAllWords(childNames[j]);
            console.log(theWordsL);
            childLearned.push(theWordsL);
        }
        console.log(childLearned);
        if(allWordsL==null){
            return res.render('pages/profile', {username: getUser.username, email: getUser.email, child: getUser.children,isParent:true,learned:false,childLearn: childLearned,login:true,correct: getUser.correct,title:"profile"});
        }else{
            return res.render('pages/profile', {username: getUser.username, email: getUser.email, child: getUser.children,isParent:true,learned:true,wordsLearned: allWordsL.word,login:true,childLearn: childLearned,correct: getUser.correct,title:"profile"});
        }
    }
})

module.exports=router;