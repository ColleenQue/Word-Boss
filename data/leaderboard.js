const mongoCollections = require('../config/mongoCollections');
const userCollection= mongoCollections.users;
const {ObjectId} = require('mongodb');
const user = require('./users');

// sort children by leaderboard
module.exports ={
async sortChildren (){
    const childCollection = await userCollection();
    // gets all the user correct scores
 
    const childList = await childCollection.find().sort({correct:-1}).toArray();

    console.log(childList);
    let result = [];
    for(let i = 0; i < 3; i++){
        if (childList[i]){
            result.push(childList[i]);
        }
        
    }
    return result;
}
}