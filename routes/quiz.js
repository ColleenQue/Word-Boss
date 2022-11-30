const vocab = require('../data/vocab');
const quiz = require('../data/quiz');
const lWords=require('../data/learnedWords');
const express = require('express');
const router = express.Router();

let question;
router.use("/", (req, res, next) => {
    //if session not logged in
    if (!req.session.user) {
      return res.redirect("/login");
    }
    next();
  });

router.get('/', async (req, res) => {
    question = await quiz.generateQuestion();
    res.render('pages/quiz', {
        definition : question[1],
        choice1 : question[2][0],
        choice2 : question[2][1],
        choice3 : question[2][2],
        choice4 : question[2][3]
    });

})
router.post('/', async (req, res) => {
    let search = req.body;
    search = search.choice;
    let correct = question[0];
    if(search == correct){
        try{
            lWords.addWord(req.session.user,search);
            return res.render('pages/correct');
        }catch(e){
            res.status(400).render('pages/quiz', {
                definition : question[1],
                choice1 : question[2][0],
                choice2 : question[2][1],
                choice3 : question[2][2],
                choice4 : question[2][3]
            });
        }
    }
    else{
        return res.render('pages/incorrect')
    }
    //     definition : question[0],
    //     choice1 : question[1][0],
    //     choice2 : question[1][1],
    //     choice3 : question[1][2],
    //     choice4 : question[1][3],
    //     login:true,
    //     title:"quiz"
    // });

})
router.post('', async (req, res) => {


    let answer = req.body.word;
    let correct;
    let incorrect;

    try {
        var obj = await vocab.WordToday();
        obj = obj.word;
        word = obj.word;
        correct = spelling.spellCheck(answer,word);
        if(correct==false){
            incorrect = true;
        }
        res.render('pages/spelling', { type: type, definition:definition, word:word, correct:correct, incorrect:incorrect,login:true,title:"quiz"});
        return;

      }
      catch (e) {
        res.status(400).render('pages/spelling', { type: type, definition:definition, word:word, correct:correct,error:e,login:true,title:"quiz"});
        return;
      }
})

module.exports = router;
