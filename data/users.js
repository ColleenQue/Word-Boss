const mongoCollections=require("../config/mongoCollections");
const users=mongoCollections.users;
const bcrypt=require('bcrypt');
const saltRounds=12;
const validation=require('../validation');
const emailValidator=require('email-validator');

let exportedMethod=
{
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
            let childrens=[];
            for(let i=0;i<childName.length;i++){
                let theChild=await userCollections.findOne({username: childName[i].toLowerCase()});
                if (theChild===null) throw "Error: Child is not found in the database"
                childrens.push(theChild);
            }
            let newUser={
                username: username,
                password: hash,
                email: email,
                children: childrens,
            }
            const insertInfo=await userCollections.insertOne(newUser);
            if (!insertInfo.acknowledged || !insertInfo.insertedId){
                throw "Could not add user";
            }
            
            return { userInserted: true };
        }
    }
}

module.exports=exportedMethod;