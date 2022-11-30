const Collections = require('../config/mongoCollections');
const userCollection= Collections.users;
const {ObjectId} = require('mongodb');
const uses_js = require('./movies');

// sort children by leaderboard
const sortChildren = async (
) => {
    let childList = user_js.getAllChildren();
    // gets all the user correct scores
    let compareCorrect= (a,b) => {
        return a.correct - b.correct
    };

    childList.sort(compareCorrect);

    let result = [];
    for(let i = 0; i < 5; i++){
        result.push(childList[i]);
    }
    console.log(result);
    return result;
}

module.exports = {
    sortChildren
};