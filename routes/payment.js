const payment = require('../data/payment');
const express = require('express');
const router = express.Router();
const validation=require('../validation');


router.get('', async (req, res) => {
  if (req.session.user){
    return res.render('pages/payment', {login:true,title:"payment"});
    
  }
  //check if there is a user logined in if not go to login
  else {
    return res.render('pages/login', {title: "Login"});
  }
});
router.post('/', async (req, res) => {

  //check all inputs
  let cname = req.body.cnameInput;
  let cardnumber = req.body.cnumInput;
  let cvc=req.body.cardnumberCVC;
  let cardnumberExp=req.body.cardnumberExp;
  try {
    cname= validation.checkCname(req.body.cnameInput);
    cardnumber = payment.validateCreditCard(req.body.cnumInput);
    cvc = payment.validateCreditCardCVC(req.body.cardnumberCVC);
    cardnumberExp=payment.validateCreditCardExpirationDate(cardnumberExp);
  }
//page
  catch (e) {
    res.status(400).render('pages/payment', { err: true, message: e , login: true,title:"Payment"});
    return;
  }
  //Credit card is valid
  //IF credit card is valid the answer is shown
  
  res.redirect('/profile');


  // if (result.authenticated === true) {
  //   //res.render('pages/home', {login:true});
  //   res.redirect('/profile');

  // }
  // else {
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

})

module.exports = router;