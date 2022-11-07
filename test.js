const vocab = require("./data/vocab");
const spelling = require("./data/spelling");

//cindy's test cases for users
const dbConnection=require('./config/mongoConnection');
const data=require('./data');
const users=data.users;

async function testUsers(){
    const db=await dbConnection.connectToDb();
    await db.dropDatabase();
    
    try{
        let username="211bunnies"
        let password="cindytran"
        let email="Cindy795Tran@gmail.com"
        await users.createUser(username,password,email,false);
        console.log("Completed Successfully");
    }catch(e){
        console.log("Got error "+e);
    }

    try{
        let username="albertchen546"
        let password="albertchenthebest"
        let email="albertchen@gmail.com"
        let child=["211bunnies"];
        await users.createUser(username,password,email,true,child);
        console.log("Completed Successfully");
    }catch(e){
        console.log("Got error "+e);
    }

    try{
        let username="imachild"
        let password="imachild"
        let email="iamachild@gmail.com"
        let child=["albertchen546"];
        await users.createUser(username,password,email,false,child);
        console.log("Got error: Child was able to have children");
    }
    catch(e)
    {
        console.log("Completed Successfully");
    }
    
    try{
        let username = "Jae Jang"
        let password = "monkeybusiness2002"
        let email = "jaesus02@gmail.com"
        await users.createUser(username,password,email,false);
        console.log("Completed Successfully");
    }catch(e){
        console.log("Got error" + e);
    }
    console.log("DONE");
    await dbConnection.closeConnection();
}


/*
test("test get all words ", () => {
    expect(vocab.getAllWords()[0]).toBe(obj1);
});
*/

async function testVocab(){
    try{
        const word = await vocab.WordToday();
        console.log(word);
    }
    catch(e){
        console.log(e);
    }


    //second generation should give the same word
    try{
        const word = await vocab.WordToday();
        console.log(word);
    }
    catch(e){
        console.log(e);
    }

}

async function allWords(){
    try{
        const all = await vocab.getAll();
        console.log(all);
    }
    catch(e){
        console.log(e);
    }
}

async function allwords2(){
    try{
        const all = await vocab.getAllWords();
        console.log(all);
    }
    catch(e){
        console.log(e);
    }
}

function spellCheck(){
    console.log(spelling.spellCheck("hi","hi"));
    console.log(spelling.spellCheck("",""));
    console.log(spelling.spellCheck("","/"));
    
}

function spellCheck2(){
    try{
        const incorrect = spelling.spellCheck(123,"hi");
        console.error("spellCheck did not error")
    }
    catch(e){
        console.log("spellCheck failed successfully")
    }
    
}
function spellCheck3(){
    try{
        const incorrect = spelling.spellCheck("Hello","hi");
        console.error(incorrect);
        //returns false
    }
    catch(e){
        console.log("spellCheck failed successfully")
    }
    
}




// allWords();
// allwords2();
// spellCheck();
// testVocab();
// testUsers();
// spellCheck2();
// spellCheck3();
