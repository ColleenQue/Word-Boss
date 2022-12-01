const mongoCollections = require('../config/mongoCollections');
const userCollection= mongoCollections.users;
const {ObjectId} = require('mongodb');
<<<<<<< Updated upstream
const user = require('./users');
=======
const user_js = require('./users');
>>>>>>> Stashed changes

// sort children by leaderboard
module.exports ={
async sortChildren (){
    const childCollection = await userCollection();
    // gets all the user correct scores
<<<<<<< Updated upstream
 
    const childList = await childCollection.find().sort({correct:-1}).toArray();
=======
    let compareCorrect= (a,b) => {
        return b.correct - a.correct
    };

    childList.sort(compareCorrect);
>>>>>>> Stashed changes

    console.log(childList);
    let result = [];
    for(let i = 0; i < 3; i++){
        result.push(childList[i]);
    }
    return result;
}
}