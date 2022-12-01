const words = require('./words.json');
const users = require('./data/users');
const connection = require('./config/mongoConnection');


const main = async () => {


    let user1 = undefined;
    let user2 = undefined;
    let user3 = undefined;
    let user4 = undefined;
    let user5 = undefined;
    let user6 = undefined;
    let user7 = undefined;
  
    try {
        //create children
        user1 = await users.createUser("gobble","password","email@gmail.com");
        user2 = await users.createUser("christmas","password","email@gmail.com");
        user3 = await users.createUser("agile","password","email@gmail.com");
        user4 = await users.createUser("easter","password","email@gmail.com");
        user5 = await users.createUser("welowello","password","email@gmail.com");

      } catch (e) {
        console.log(e);
      }
    

      try {
        //create parents
        user6 = await users.createUser("gobblesmom","password","email@gmail.com",true,["gobble"]);
        user7 = await users.createUser("christmasmom","password","email@gmail.com",true,[]);
        
      } catch (e) {
        console.log(e);
      }

      try {
        //create children
        //to display leaderboard
        user1 = await users.updateUser("gobble","password","email@gmail.com",3);
        user2 = await users.updateUser("christmas","password","email@gmail.com",10);
        user3 = await users.updateUser("agile","password","email@gmail.com",11);
        user4 = await users.updateUser("easter","password","email@gmail.com",100);

      } catch (e) {
        console.log(e);
      }

    const db = await connection.connectToDb();
    await connection.closeConnection();
  };
  
  main().catch((error) => {
    console.log(error);
  });