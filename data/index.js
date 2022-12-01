const userData=require('./users');
const leader = require('./leaderboard');
const spelling=require('./spelling');
const payment = require('./payment');
const learnedWords=require('./learnedWords');
module.exports=
{
    users: userData,
    leader: leader,
    learnedWords: learnedWords,
}