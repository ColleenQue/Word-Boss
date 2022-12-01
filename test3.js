const progress = require("./data/progress");
const fillblank=require("./data/fillblank");
const paymentData=require("./data/payment");
const validation = require("./validation");
const dbConnection=require('./config/mongoConnection');

async function testPayment(){
    const db=await dbConnection.connectToDb();


    try {
        const paymentMethod = await paymentData.createPayment("parent", "Daneil Tan", "2222567890123456", "666", "03/2023");
        console.log(paymentMethod);
    }
    catch(e){
        console.log(e);
    }
    console.log("DONE");
    await dbConnection.closeConnection();
}

testPayment();