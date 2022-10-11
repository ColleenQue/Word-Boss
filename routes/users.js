const express=require('express');
const router=express.Router();
const validation=require('../validation');
const user=require('../data/users');
const emailValidator=require('deep-email-validator');

router.get('/login', async(req,res)=>{
    if(req.session.user){
        res.redirect('/home');
    }
    else
    {
        res.render('posts/user/login',{title: "Log in", not_logged_in: true});
    }
});

router.get('/signup', async(req,res)=>{
    if(req.session.user){
        res.redirect('/home');
    }
    else
    {
        res.render('posts/user/signup',{title: "Sign in", not_logged_in: true});
    }
});

router.post('/signup',async(req,res) =>{
    try
    {
        let username=validation.checkUserName(req.body.username);
        let password=validation.checkPassWord(req.body.password);
        let isValid=await emailValidator.validate(req.body.email);
        if (isValid.valid==false)
        {
            res.status(400).render('posts/user/signup',{err: true, message: "Error: Email is not valid", title: "Sign up", not_logged_in: true});
        }
        if(req.body.parent===undefined && req.body.child==="Child"){
            const result=await user.createUser(username,password,req.body.email,false);
            if(result.userInserted){
                res.redirect('/login');
            }
            else
            {
                res.status(500).json({error: "Internal Sever Error"});
            }
        }
        else if(req.body.parent==="Parent" && req.body.child===undefined)
        {
            const result=await user.createUser(username,password,req.body.email,true,req.body.childName);
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
        res.status(400).render('posts/user/signup', { err: true, message: e ,title: "Sign up", not_logged_in: true,});
    }
});

module.exports=router;