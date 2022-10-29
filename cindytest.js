const dbConnection=require('./config/mongoConnection');
const data=require('./data');
const users=data.users;

async function main()
{
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
}
main();