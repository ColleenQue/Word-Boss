const express = require('express');
const router = express.Router();
const validation=require('../validation');
const user=require('../data/users');
const emailValidator=require('email-validator');


router.get('', async (req, res) => {
    res.render('pages/signup',{});
});

router.post('',async(req,res) =>{
    try
    {
        let username=validation.checkUserName(req.body.username);
        let password1=validation.checkPassWord(req.body.password1);
        let password2=validation.checkPassWord(req.body.password2);
        let isValid;
        if(!(password1==password2)) throw "Error: Passwords do not match up"
        if(req.body.email==""){
            isValid=true;
        }else{
            isValid=await emailValidator.validate(req.body.email);
        }
        if (isValid.valid==false)
        {
            res.status(400).render('pages/signup',{err: true, message: "Error: Email is not valid", title: "Sign up", not_logged_in: true});
        }
        if(req.body.identity==="Child"){
            if(req.body.childName==null){
                res.status(400).render('pages/signup',{err: true, message: "Error: You need to be a parent to have a child", title: "Sign up", not_logged_in: true});
            }
            else{
            const result=await user.createUser(username,password1,req.body.email,false);
            if(result.userInserted){
                res.redirect('/login');
            }
            else
            {
                res.status(500).json({error: "Internal Sever Error"});
            }

            }
        }
        else if(req.body.identity==="Parent")
        {
            if (!(Array.isArray(req.body.childName))){
                req.body.childName=[req.body.childName];
            }
            const result=await user.createUser(username,password1,req.body.email,true,req.body.childName);
            if(result.userInserted){
                res.redirect('/login');
            }
            else
            {
                res.status(500).json({error: "Internal Sever Error"});
            }
        }
    }catch(e)
    {
        res.status(400).render('pages/signup', { err: true, message: e ,title: "Sign up", not_logged_in: true,});
    }
});

module.exports = router;