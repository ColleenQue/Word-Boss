const vocab = require('../data/vocab');
const spelling = require('../data/spelling')
const express = require('express');
const e = require('express');
const router = express.Router();



router.get('/', async (req, res) => {

    var word,type,definition;
    var log;

    if (!req.session.user){
      log = false;
    }
    else{
      log=true;
    }

    try {
        var obj = await vocab.WordToday();
        var wordToday =obj.word ;
        type = wordToday.type;
        definition = wordToday.definition;
        word = wordToday.word;

        res.render('pages/vocab', { word: word, type: type, definition:definition,login:log});
      }
      catch (e) {
        res.status(400).render('pages/vocab', { word: word, type: type, definition:definition,error:e,login:log});
        return;
      }


},)

module.exports = router;