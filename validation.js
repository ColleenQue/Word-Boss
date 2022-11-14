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
      },

      checkCname(cname){
        if (!cname) throw "must provide cname"
        if (typeof cname !== "string")
            throw "Error: password should be a string";
        cname = cname.trim();
 
        cname=cname.split(" ");
        if (cname.length < 2){
            throw 'One of the castMember only provided their firstName';
        }
        if (cname.length > 2){
            throw 'Not valid input';
        }
        if (cname[0].trim().length < 2){
            throw 'First name has to be at least 2 characters';
        }
        if (cname[1].trim().length < 2){   
            throw 'Last name has to be at least 2 characters';
        }
        return cname;
      },
      checkStringHasNumbers(str){
        let numbers= /[0-9]/;
        if(numbers.test(str)){
            return true;
        }
        else{
            return false;
        }
    },
      validateCreditCard(str){
        if (str == undefined){
            throw 'Must provide valid values';
        }
        if (checkStingHasNumbers(str) != true){
            throw 'Numbers must be provided.';
        }
        if (str.length > 16 || str.length < 15){
            throw 'Not valid input';
        }
        return str;
    },
    validateCreditCardPostalCode(str){
        if (str == undefined){
            throw 'Must provide valid values';
        }
        if (checkStingHasNumbers(str) != true){
            throw 'Numbers must be provided.';
        }
        if (str.length > 5 || str.length<5){
            throw 'Not valid input';
        }
        return str;
    },
    validateDate(date){
        let listeddate="";
        //month/year
        let regex_date = /\d{1,2}\/\d{4}$/;
        // console.log(regex_date);
        //console.log(date);
        if (!regex_date.test(date.trim())){
            throw 'Date is not in correct form';
        }
        if (!date.includes("/")){
            throw 'Invalid format no /.';
        }
        listeddate = date.trim().split("/");
    
        if (listeddate.length != 3){
            throw 'Invalid format Not in : month, day, year';
        }
        let month = parseInt(listeddate[0]);
        let year = parseInt(listeddate[1]);
    
        //Check Year
        let currentYear = new Date()
        maxyear = currentYear.getFullYear();
        // console.log(maxyear);
        if (year < currentYear || year > maxyear+5){
            throw 'The expiration date is less than right now.';
        }
        if (month < 1 || month > 12){
            throw 'No month less than 01 and no more than 12 months';
        }
        return date;
    
    },
    validateCreditCardExpirationDate(str){
        if (str == undefined){
            throw 'No date given';
        }
        if (checkStingHasNumbers(str) != true){
            throw 'Invalid format';
        }
        if (str.length > 6 || str.length < 6){
            throw 'Invalid format';
        }
        validateDate(str);
        return str;
    },
    validateCreditCardCVC(str){
        if (str == undefined){
            throw 'No CVC given';
        }
        if (checkStingHasNumbers(str) != true){
            throw 'CVC not correct format';
        }
        if (str.length != 3){
            throw 'CVC not correct format';
        }
        return str;
    }
    

      
}
