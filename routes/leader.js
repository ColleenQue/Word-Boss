const express = require('express');
const axios = require('axios');
const router = express.Router();
const data = require('../data');
const path = require('path');
const leaderData = data.leaderboard;

router.get('', async (req, res) => {
    if(req.session.user){
        const leaderList = await leaderData.sortChildren();
        res.render('pages/leaderboard', {login:true,title:"Leaderboard", leaderList: leaderList});
    }
    else{
        throw 'Error: sussy balls';
    }

});

module.exports = router;