const progress = require("./data/progress");

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


testProgress();


