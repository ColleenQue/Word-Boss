const vocab = require('../data/vocab');
const spelling = require('../data/spelling')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {

    var word,type,definition;

    try {
        var obj = await vocab.WordToday();
        wordOftheDay = obj;
        word = obj.word;
        type = obj.type;
        definition = obj.definition;

        res.render('pages/vocab', { word: word, type: type, definiton:definition});
      }
      catch (e) {
        res.status(400).render('pages/vocab', { word: word, type: type, definiton:definition,error:e});
        return;
      }


},)

module.exports = router;