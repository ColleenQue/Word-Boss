const progress = require("./data/progress");
const fillblank=require("./data/fillblank");
const paymentData=require("./data/payment");
const validation = require("./validation")

/*Colleen's test progress*/
async function testProgress(){
    try{
        const user = await progress.updateProgress('hihi',20);
        console.log(user);
    }
    catch(e){
        console.log(e);
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

//Dylan Tran
async function paymentPortal(){
    try{
        const cred = await validation.validateCreditCard("1929292876508363");
        console.log(cred);
    }
    catch(e){
        console.log(e);
    }
    try{
        const cred = await validation.validateCreditCardCVC("525");
        console.log(cred);
    }
    catch(e){
        console.log(e);
    }
    try{
        const cred = await validation.validateCreditCardExpirationDate("05/2024");
        console.log(cred);
    }
    catch(e){
        console.log(e);
    }
    try{
        const cred = await validation.validateCreditCardPostalCode("07030");
        console.log(cred);
    }
    catch(e){
        console.log(e);
    }

}

testProgress();

