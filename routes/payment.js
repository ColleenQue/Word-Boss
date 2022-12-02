const mongoCollections=require("../config/mongoCollections");
const users=mongoCollections.users;
const payment = require('../data/payment');
const express = require('express');
const router = express.Router();
const validation=require('../validation');
const user=require('../data/users');
const lWords=require('../data/learnedWords');
router.get('', async (req, res) => {

  if (req.session.user){
    const getUser=await user.findUser(req.session.user);
    // console.log('Hello');
    // console.log(getUser);
    const allWordsL=await lWords.getAllWords(req.session.user);
    if(typeof(getUser.children)!="undefined"){
      // console.log('Hello1');
      //payment TEMP FIX
      if(allWordsL==null){
        return res.render('pages/payment', {login:true,title:"payment", username: getUser.username, email: getUser.email,wordsLearned: allWordsL});
    }else{
      return res.render('pages/payment', {login:true,title:"payment", username: getUser.username, email: getUser.email,wordsLearned: allWordsL.word});
    }
      //return res.render('pages/payment', {login:true,title:"payment", username: getUser.username, email: getUser.email,wordsLearned: allWordsL.word});
    }
    else {
      // console.log('Hello2');
      res.redirect('profile');
      return;
      //return res.render('pages/profile', {login:true,title:"profile", username: getUser.username, email: getUser.email,wordsLearned: allWordsL.word});
    }
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
  // console.log(cname);
  // console.log(typeof cardnumber);
  // console.log(typeof cardnumberCVC);
  // console.log(typeof cardnumberExp)
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
  
  try{
    let payment1=payment.createPayment(req.session.user, cname,cardnumber,cvc, cardnumberExp);
    if ((await payment1).paymentInserted == true) {
      //Profile res.rendor
      res.redirect('profile');
      return;
    }
    else {
      res
        .status(500)
        .render("userRegister", {
          error: "Internal Server Error",
          title: "Register",
        });
      // res.status(500).json({error: "Internal Server Error"});
      return;
    }

  } catch(e){
    res.status(400).render('pages/payment', { err: true, message: e , login: true,title:"Payment"});
    return;

  }
  //return;

  // if (result.authenticated === true) {
  //   //res.render('pages/home', {login:true});
  //   res.redirect('/profile');

  // }
  // else {
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

})

module.exports = router;