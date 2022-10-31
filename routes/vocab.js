const vocab = require('../data/vocab');
const spelling = require('../data/spelling')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {

    var word,type,definition;

    try {
        var obj = await vocab.WordToday();
        var wordToday =obj.word ;
        type = wordToday.type;
        definition = wordToday.definition;
        word = wordToday.word;

        res.render('pages/vocab', { word: word, type: type, definition:definition});
      }
      catch (e) {
        res.status(400).render('pages/vocab', { word: word, type: type, definition:definition,error:e});
        return;
      }


},)

module.exports = router;