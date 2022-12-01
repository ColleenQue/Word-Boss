<<<<<<< Updated upstream
const progress = require("./data/progress");
const fillblank=require("./data/fillblank");
const paymentData=require("./data/payment");
const validation = require("./validation");
const lWords=require('./data/learnedWords');
const users=require('./data/users');
const dbConnection=require('./config/mongoConnection');


//Dylan's test case for payment
async function testPayment(){
    const db=await dbConnection.connectToDb();


    try {
        const paymentMethod = await paymentData.createPayment("parent", "Daneil Tan", "2222567890123456", "666", "03/2023");
        console.log(paymentMethod);
    }
    catch(e){
=======
const users = require("./data/users");
const leader = require("./data/leaderboard");

const dbConnection = require('./config/mongoConnection');
const data = require('./data');
const leaderData = data.leader;

async function testUsers(){
    const db = await dbConnection.connectToDb();
    await db.dropDatabase();

    try{
        let cock = await leaderData.sortChildren();
        console.log(cock);

    }catch(e){
>>>>>>> Stashed changes
        console.log(e);
    }
    console.log("DONE");
    await dbConnection.closeConnection();
<<<<<<< Updated upstream
}

testPayment();

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

=======
}
>>>>>>> Stashed changes
