
const lWords=require('./data/learnedWords');
const users=require('./data/users');
//cindy's test cases for learned words
async function testLWords(){
    try{
        let username="201bunnies"
        let password="cindytran"
        let email="Cindy795Tran@gmail.com"
        await users.createUser(username,password,email,false);
        let word="modification";
        await lWords.addWord(username,word);
        const theWord=await lWords.getAllWords(username);
        if(theWord.word[0]==word){
            console.log("Works!!!")
        }
        else{
            console.log("Doesn't work");
        }
    }catch(e){
        console.log(e);
    }
}

testLWords();