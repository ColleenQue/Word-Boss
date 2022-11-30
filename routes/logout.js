const express=require('express');
const router=express.Router();


router.get("/", async (req, res) => {

    console.log("here")
    req.session.destroy();
    return res.redirect("/home");
  });
  
  module.exports = router;