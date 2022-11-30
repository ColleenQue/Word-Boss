const express = require('express');
const router = express.Router();


router.get('', async (req, res) => {
    if(req.session.user){
        res.render('pages/home', {login:true,title:"Home"});
    }
    else{
        res.render('pages/home',{title:"Home"});
    }

});

module.exports = router;