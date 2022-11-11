
const vocab = require('../data/vocab');
const spelling = require('../data/spelling')
const progress = require('../data/progress');
const express = require('express');
const router = express.Router();

//Middleware
//have to log in
router.use("/", (req, res, next) => {
    //if session not logged in
    if (!req.session.user) {
      return res.redirect("/login");
    }
    next();
  });

router.get('', async (req, res) => {

    try {
        var obj = await vocab.WordToday();
        var wordToday = obj.word;
        type = wordToday.type;
        definition = wordToday.definition;
        res.render('pages/spelling', { type: type,definition:definition});
        return;
      }
      catch (e) {
        res.status(400).render('pages/spelling', { type: type,definition:definition,error:e});
        return;
      }
}),

router.post('', async (req, res) => {


    let answer = req.body.word;
    let username = req.session.user;
    console.log(username);
    let correct;
    let incorrect;

    try {
        var obj = await vocab.WordToday();
        obj = obj.word;
        word = obj.word;
        correct = spelling.spellCheck(answer,word);
        if(correct){
          //update progress
          progress.updateProgress(username,20);
        }
        else{
          //incorrect
          incorrect = true;
        }



        res.render('pages/spelling', { type: type, definition:definition, word:word, correct:correct, incorrect:incorrect});
        return;

      }
      catch (e) {
        res.status(400).render('pages/spelling', { type: type, definition:definition, word:word, correct:correct,error:e});
        return;
      }

}),



module.exports = router;
