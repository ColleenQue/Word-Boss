const mongoCollections=require("../config/mongoCollections");
const users=mongoCollections.users;
const bcrypt=require('bcrypt');
const saltRounds=12;
const validation=require('../validation');
const emailValidator=require('email-validator');
const { MONGO_CLIENT_EVENTS } = require("mongodb");

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
            if(childName!=null){
                throw "Error: Child cannot have children"
            }
            let newUser={
                username: username,
                password: hash,
                email: email,
                correct: 0
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

        
    },

    async updateUser(username,password,email, correct){
        username=validation.checkUserName(username);
        password=validation.checkPassWord(password);
        checkEmail=emailValidator.validate(email);
        if (checkEmail.valid===false) throw "Error: Email is not valid"
        const userCollections=await users();

        const user = await userCollections.findOne({username: username});
        if(!user){
            throw 'Error: user doesnt exist?';
        }
        console.log(user);

        if (user == null) throw "Error: username doesn't taken";
        // for some reason the console logs output the same thing 
        let updatedUser={
            username: username,
            password: password,
            email: email,
            correct: correct
        }
        
        const updatedInfo=await userCollections.updateOne({_id: user._id}, {$set: updatedUser});
        // console.log(updatedInfo);
        return {authenticatedUser: true };
        
    },
    
    async checkUser(username,password){
        //username = username.toLowerCase();
        const userCollection = await users();
        const user = await userCollection.findOne({ username: username.toLowerCase() });
       // console.log(user);
        if (user==null) throw "Either Password or Username is invalid";


        
        let compare = false;
        compare = await bcrypt.compare(password,user.password);

        if(compare){
            
            return {authenticated:true};
        }
        else throw "Either Username or Password is invalid"

    },
    async findUser(username){
        const userCollection = await users();
        const user = await userCollection.findOne({ username: username.toLowerCase() });
        if(user===null){
            throw "Cannot find user"
        }else{
            return user;
        }
    },

    async getAllChildren(){
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();

        if(!userList){
            throw 'Could not get all the movies';
        }

        function id_to_string(current){
            let temp = current["_id"].toString();
            current["_id"] = temp;
        }
        // creating list of child
        let childList = [];
        for(let i = 0; i < userList.length; i++){
            let result = userList[i].hasOwnProperty('correct');
            if(result){
                childList.push(userList[i]);
            }
        }

        childList.forEach(id_to_string);

        
        return childList;
    }

}

module.exports=exportedMethod;
