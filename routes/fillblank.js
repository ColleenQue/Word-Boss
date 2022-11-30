const express = require('express');
const router = express.Router();
const fillblank = require('../data/fillblank');
const lWords=require('../data/learnedWords');

router.use("/", (req, res, next) => {
    //if session not logged in
    if (!req.session.user) {
      return res.redirect("/login");
    }
    next();
  });

router.get('', async (req, res) => {
    let theWord=await fillblank.WordToday();
    theWord=theWord.word;
    res.render('pages/fillblank',{partOne:theWord.firstHalf,partTwo:theWord.secondHalf,login:true,title: "Fill in the Blank"});
});

router.post('',async(req,res)=>{
    let word=req.body.word;

    let theWord=await fillblank.WordToday();
    theWord=theWord.word;
    try{
        if(theWord.word==word){
            lWords.addWord(req.session.user,word);
            res.render('pages/fillblank',{title: "Fill in the Blank",partOne:theWord.firstHalf,partTwo:theWord.secondHalf,right:"You've inputed the right word!",login:true});
        }
        else{
            res.render('pages/fillblank',{title: "Fill in the Blank",partOne:theWord.firstHalf,partTwo:theWord.secondHalf,wrong:"You've inputed the wrong word!",correctW:theWord.word,login:true});
        }
    }catch(e){
        res.status(400).render('pages/fillblank',{title: "Fill in the Blank",partOne:theWord.firstHalf,partTwo:theWord.secondHalf,login:true});
    }

});

module.exports = router;