const express = require('express');
const router = express.Router();
const fillblank = require('../data/fillblank');
const lWords=require('../data/learnedWords');
const payment=require('../data/payment');

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
    let paymentMethod= await payment.CheckParentHasPaymentfromChild(req.session.user);
    theWord=theWord.word;
    try{

        validPayment= await (paymentMethod).paymentParent;
        console.log(validPayment)
        console.log("Child has parent");
        if (validPayment){
            console.log("Child has valid payment");
            res.render('pages/fillblank',{title: "Fill in the Blank",validPayment:true, partOne:theWord.firstHalf,partTwo:theWord.secondHalf, smallhint: theWord.word[0] +theWord.word[1]+theWord.word[2],login:true});

        }
        else{
            console.log("Child has INvalid payment");
            res.render('pages/fillblank',{title: "Fill in the Blank", validPayment:false, partOne:theWord.firstHalf,partTwo:theWord.secondHalf, login:true});
        }
        // if(theWord.word==word){
        //     lWords.addWord(req.session.user,word);
        //     res.render('pages/fillblank',{title: "Fill in the Blank",partOne:theWord.firstHalf,partTwo:theWord.secondHalf,right:"You've inputed the right word!",login:true});
        // }
        // else{
        //     res.render('pages/fillblank',{title: "Fill in the Blank",partOne:theWord.firstHalf,partTwo:theWord.secondHalf,wrong:"You've inputed the wrong word!",correctW:theWord.word,login:true});
        // }
    }catch(e){
        res.status(400).render('pages/fillblank',{title: "Fill in the Blank",partOne:theWord.firstHalf,partTwo:theWord.secondHalf,login:true});
    }

});

module.exports = router;