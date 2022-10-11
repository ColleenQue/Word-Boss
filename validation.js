const { ObjectId } = require("mongodb");

module.exports={
    checkUserName(username) {
        if (!username) throw "must provide username"
        if (typeof username !== "string")
            throw "Error: username should be a string";
        if (username.indexOf(" ") >= 0)
            throw "Error: username should not have any spaces";
        username = username.trim();
        if (username.length < 4)
            throw "Error: username must have at least four characters";
        //check for alphnumeric 
        //https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
    
        for (let i = 0; i < username.length; i++) {
            let code = username.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
                throw "username must have only alphanumeric characters"
            }
        }
    
        return username;
      },
      checkPassWord(password) {
        if (!password) throw "must provide password"
        if (typeof password !== "string")
            throw "Error: password should be a string";
        if (password.indexOf(" ") >= 0)
            throw "Error: password should not have any spaces";
        password = password.trim();
        if (password.length < 6)
            throw "Error: password must have at least eight characters";
        return password;
      }
}