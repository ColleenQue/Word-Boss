const express = require('express');
const router = express.Router();
const fillblank = require('../data/fillblank');


router.get('', async (req, res) => {
    let theWord=await fillblank.WordToday();
    theWord=theWord.word;
    res.render('pages/fillblank',{partOne:theWord.firstHalf,partTwo:theWord.secondHalf});
});

router.post('',async(req,res)=>{
    let answer1 = req.body.wordInput1;
    let type=req.body.wordType;
    let answer2=req.body.wordInput2;

    let theWord=await fillblank.WordToday();
    theWord=theWord.word;
    try{
        if(theWord.word==answer1){
            if(theWord.type==type){
                if(theWord.word==answer2){
                    res.render('pages/fillblank',{partOne:theWord.firstHalf,partTwo:theWord.secondHalf,right:"You've inputed the right word!"});
                }
                else{
                    res.render('pages/fillblank',{partOne:theWord.firstHalf,partTwo:theWord.secondHalf,wrong:"You've inputed the wrong word!"});
                }
            }
            else{
                res.render('pages/fillblank',{partOne:theWord.firstHalf,partTwo:theWord.secondHalf,wrong:"You've inputed the wrong type!"});
            }
        }
        else{
            res.render('pages/fillblank',{partOne:theWord.firstHalf,partTwo:theWord.secondHalf,wrong:"You've inputed the wrong word!"});
        }
    }catch(e){
        res.status(400).render('pages/fillblank',{partOne:theWord.firstHalf,partTwo:theWord.secondHalf});
    }

});

module.exports = router;