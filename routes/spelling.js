const vocab = require('../data/vocab');
const spelling = require('../data/spelling')
const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {

    try {
        var obj = await vocab.WordToday();
        type = obj.type;
        definition = obj.definition;
        res.render('pages/spelling', { type: type,definiton:definition});
        return;
      }
      catch (e) {
        res.status(400).render('pages/spelling', { type: type,definiton:definition,error:e});
        return;
      }
}),

router.post('', async (req, res) => {


    let answer = req.body.spelling_answer;
    let correct;

    try {
        var obj = await vocab.WordToday();
        word = obj.word;
        correct = spelling.spellCheck(answer,word);
        res.render('pages/spelling', { type: type, definiton:definition, word:word, correct:correct});
        return;

      }
      catch (e) {
        res.status(400).render('pages/spelling', { type: type, definiton:definition, word:word, correct:correct,error:e});
        return;
      }

}),



module.exports = router;