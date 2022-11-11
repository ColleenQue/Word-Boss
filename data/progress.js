const mongoCollections=require("../config/mongoCollections");
const users=mongoCollections.users;
const validate = require("../validation");
const account = require("./users")

let exportedMethod=
{

  async updateProgress(username, progress) {

    username = validate.checkUserName(username);
    progress = validate.checkNum(progress);
    if(progress<0){
        throw "progress must be greater than 0";
    }

    const userCollection = await users();
    const tempUser = await account.findUser(username)

    const updatedUser = {
            username: tempUser.username,
            password: tempUser.password,
            email: tempUser.email,
            progress:tempUser.progress + progress
        
    };

    const updatedInfo = await userCollection.updateOne(
      { username: username },
      { $set: updatedUser }
    );

    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update user successfully';
    }

    return updatedUser;

  }


}

module.exports=exportedMethod;
