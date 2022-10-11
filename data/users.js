const mongoCollections=require('../config/mongoCollections');
const users=mongoCollections.users;
const bycrypt=require('bcrypt');
const saltRounds=12;
const validation=require('../validation');
const bcrypt = require('bcryptjs/dist/bcrypt');
const emailValidator=require('deep-email-validator');

let exportedMethods={
    async createUser(username,password,email,isParent,childName){
        username=validation.checkUserName(username);
        password=validation.checkPassWord(password);
        checkEmail=emailValidator.validate(email);
        if (checkEmail.valid===false) throw "Error: Email is not valid"
        const userCollections=await users();
        const user=await userCollections.findOne({username: username.toLowerCase()});
        if (user != null) throw "Error: username is already taken";

        const hash=await bcrypt.hash(password,saltRounds);

        if(!isParent){
            let newUser={
                username: username,
                password: hash,
                email: email,
            }
            const insertInfo=await userCollections.insertOne(newUser);
            if (!insertInfo.acknowledged || !insertInfo.insertedId){
                throw "Could not add user";
            }
            
            return { userInserted: true };
        }else
        {
            const theChild=await userCollections.findOne({username: childName.toLowerCase()});
            if (theChild==null) throw "Error: Child is not found in the database"

            let newUser={
                username: username,
                password: hash,
                email: email,
                children: [theChild]
            }
            const insertInfo=await userCollections.insertOne(newUser);
            if (!insertInfo.acknowledged || !insertInfo.insertedId){
                throw "Could not add user";
            }
            
            return { userInserted: true };
        }
    }

}

module.exports=exportedMethods;