const vocab = require('../data/vocab');
const express = require('express');
const router = express.Router();


router.get('', async (req, res) => {

    var word,type,definition;

    try {
        var obj = await vocab.Random();
        word = obj.word;
        type = obj.type;
        definition = obj.definition;
      }
      catch (e) {
        res.status(400).render('pages/vocab', { word: word, type: type,definiton:definition});
        return;
      }

});

module.exports = router;