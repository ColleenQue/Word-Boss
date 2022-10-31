const express = require('express');
const router = express.Router();


router.get('', async (req, res) => {
    if(req.session.user){
        console.log(req.session.user);
        res.render('pages/home', {login:true});
    }
    else{
        res.redirect('/login');
    }

});

module.exports = router;