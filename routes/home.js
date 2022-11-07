const express = require('express');
const router = express.Router();


router.get('', async (req, res) => {
    if(req.session.user){
        res.render('pages/home', {login:true});
    }
    else{
        res.render('pages/home', );
    }

});

module.exports = router;