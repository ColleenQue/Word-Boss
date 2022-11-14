const payment = require('../data/payment');
const express = require('express');
const router = express.Router();
const validation=require('../validation');


router.get('', async (req, res) => {

  res.render('pages/payment', {});

});

router.post('/', async (req, res) => {
    
  let cname = req.body.cname;
  let cardnumber = req.body.cardnumber;
  let cvc=req.body.cardnumberCVC;
  let cardnumberExp=req.body.cardnumberExp;
  let creditCardPostalCode=req.body.creditCardPostalCode;
  let result;
  try {
    cname= validation.checkCname(req.body.cname);
    cardnumber = validation.validateCreditCard(req.body.cardnumber);
    cvc = validation.validateCreditCardCVC(req.body.cardnumberCVC);
    cardnumberExp=validation.validateCreditCardExpirationDate(cardnumberExp);
    creditCardPostalCode=validation.validateCreditCardPostalCode(req.body.creditCardPostalCode);



    result = await user.checkUser(username, password);
  }
  catch (e) {
    res.status(400).render('pages/payment', { err: true, message: e ,title:"Log in"});
    return;
  }


  if (result.authenticated === true) {
    req.session.user=username;
    //res.render('pages/home', {login:true});
    res.redirect('/home');

  }
  else {
    res.status(500).json({ error: "Internal Server Error" });
  }

})

module.exports = router;