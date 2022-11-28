const vocab = require('../data/vocab');
const quiz = require('../data/quiz');
const express = require('express');
const user = require('../data/users')
const { users } = require('../config/mongoCollections');
const { updateUser } = require('../data/users');
const router = express.Router();

let question;
router.get('/', async (req, res) => {
    question = await quiz.generateQuestion();
    res.render('pages/quiz', {
        definition : question[1],
        choice1 : question[2][0],
        choice2 : question[2][1],
        choice3 : question[2][2],
        choice4 : question[2][3]
    });

})
router.post('/', async (req, res) => {
    let search = req.body;
    search = search.choice;
    let correct = question[0];
    if(search == correct){
        const getUser = await user.findUser(req.session.user);
        let counter = getUser.correct + 1;
        updateUser(getUser.username, getUser.password, getUser.email, counter);
        console.log(getUser);
        return res.render('pages/correct');
    }
    else{
        return res.render('pages/incorrect')
    }
})

module.exports = router;