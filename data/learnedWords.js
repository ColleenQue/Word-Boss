const mongoCollections=require("../config/mongoCollections");
const learnWords=mongoCollections.learnedWords;
const users=mongoCollections.users;
const validation=require("../validation");

let exportedMethod=
{
    async addWord(username,word){
        username=validation.checkUserName(username);
        word=validation.checkWord(word);
        const lwordsCollections=await learnWords();
        const userCollections=await users();
        const findUser=await userCollections.findOne({username: username});
        if(findUser == null){
            throw "Error: User is not registered"
        }
        const findUser2=await lwordsCollections.findOne({username: username});
        if(findUser2 !=null){
            if(findUser2.word.includes(word)===true){
                return { wordInserted: true };
            }
            else{
                let newList=findUser2.word;
                newList.push(word);
                lwordsCollections.updateOne({"username": username},{$set: {"word": newList}});
                return { wordInserted: true };
            }
        }
        else{
            let newWord={
                username: username,
                word: [word]
            }
            const insertInfo=await lwordsCollections.insertOne(newWord);
            if (!insertInfo.acknowledged || !insertInfo.insertedId){
                throw "Could not add word";
            }
            
            return { wordInserted: true };
        }

    },

    async getAllWords(user){
        const lwordsCollections=await learnWords();
        const findWords=await lwordsCollections.findOne({username:user})
        return findWords;
        //console.log(findWords);
    }

}

module.exports=exportedMethod;