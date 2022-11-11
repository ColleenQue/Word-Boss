const vocab = require('../data/vocab');
const quiz = require('../data/quiz');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    let question = await quiz.generateQuestion();
    res.render('pages/quiz', {
        definition : question[0],
        choice1 : question[1][0],
        choice2 : question[1][1],
        choice3 : question[1][2],
        choice4 : question[1][3]
    });

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
        res.render('pages/spelling', { type: type, definition:definition, word:word, correct:correct, incorrect:incorrect});
        return;

      }
      catch (e) {
        res.status(400).render('pages/spelling', { type: type, definition:definition, word:word, correct:correct,error:e});
        return;
      }

})

module.exports = router;