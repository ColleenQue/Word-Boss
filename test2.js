const progress = require("./data/progress");
const fillblank=require('./data/fillblank");

/*Colleen's test progress*/
async function testProgress(){
    try{
        const user = await progress.updateProgress('hihi',20);
        console.log(user);
    }
    catch(e){
        console.log(e);
    } 
    // Jae's test
    // catching improper use of the method with no inputs
    try{ 
        const user = await progress.updateProgress();
        console.log(user);
    }catche(e){
        cosole.log(e);
    }
}

//fill in blank tests from Cindy
async function testFillBlank(){
    //print out the word used for fillblank
    try{
        const word = await fillblank.WordToday();
        console.log(word);
    }
    catch(e){
        console.log(e);
    }

    //should print out same word used for fillblank
    try{
        const word = await fillblank.WordToday();
        console.log(word);
    }
    catch(e){
        console.log(e);
    }

}


testProgress();


