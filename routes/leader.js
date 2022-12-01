const express = require('express');
const axios = require('axios');
const router = express.Router();
const data = require('../data');
const path = require('path');
const leaderData = require('../data/leaderboard');
const { truncateSync } = require('fs');

router.get('', async (req, res) => {
    let login = req.session.user;
    try{
        const leaderList = await leaderData.sortChildren();
        console.log(leaderList);
        console.log(leaderList[0].username);
        return res.render('pages/leaderboard', {login:login,title:"Leaderboard", leaders: leaderList});
    }
    catch(e){
        return res.render('pages/error', {error:e});
    }

});

module.exports = router;