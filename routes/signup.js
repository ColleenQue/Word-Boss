const express = require('express');
const router = express.Router();
const validation=require('../validation');
const user=require('../data/users');
const emailValidator=require('deep-email-validator');


router.get('', async (req, res) => {
    res.render('')

});

module.exports = router;