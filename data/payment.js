const validate = require("../validation");
function checkStringHasSpecialChar(str){
    let specialChar= /[`@#$%^&*()_+\-=\[\]{}"\\|<>\/~]/;
    if(specialChar.test(str)){
        return true;
    }
    else{
        return false;
    }
}
function checkStingHasPunc(str){
    let puncMarks= /[.,;:!?']/;
    if(puncMarks.test(str)){
        return true;
    }
    else{
        return false;
    }
}

function checkStringHasNumbers(str){
    let numbers= /[0-9]/;
    if(numbers.test(str)){
        return true;
    }
    else{
        return false;
    }
}
//if VALIDATECreditCard ==false Then we can display the error message
//credit card can start with 0
//Only can accept Visa/MasterCard, and Discover


function validateCreditCard(str){
    if (str == undefined){
        throw 'Must provide valid redit card';
    }
    if (checkStringHasNumbers(str) != true){
        throw 'Credit card numbers must be provided.';
    }
    if (str.length > 16 || str.length < 15){
        throw 'Not valid input';
    }
    return true;
}
function validateCreditCardCVC(str){
    if (str == undefined){
        throw 'No CVC given';
    }
    if (checkStringHasNumbers(str) != true){
        throw 'CVC not correct format';
    }
    if (str.length != 3){
        throw 'CVC not correct format';
    }
    return str;
}

function validateDate(date){
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

    if (listeddate.length != 2){
        throw 'Invalid format Not in : month, year';
    }
    let month = parseInt(listeddate[0]);
    let year = parseInt(listeddate[1]);

    //Check Year
    let currentYear = new Date()
    maxyear = currentYear.getFullYear();
    // console.log(maxyear);
    if (year < currentYear.getFullYear() || year > maxyear+5){
        throw 'The expiration date is invalid';
    }
    if (month < 1 || month > 12){
        throw 'No month less than 01 and no more than 12 months';
    }
    return true;

}


function validateCreditCardExpirationDate(str){
    if (str == undefined){
        throw 'No date given';
    }
    if (checkStringHasNumbers(str) != true){
        throw 'Invalid format ExpirationDate 05/2022';
    }
    if (str.length > 7 || str.length < 7){
        throw 'Invalid format ExpirationDate  05/2022';
    }
    validateDate(str);
    return str;
}

function validateCreditCardPostalCode(str){
    if (str == undefined){
        return false;
    }
    if (validate.checkStringHasNumbers(str) != true){
        return false;
    }
    if (str.length > 5 || str.length<5){
        return false;
    }
    return true;
}

module.exports ={
    checkStringHasNumbers,
    validateCreditCard,
    validateCreditCardCVC,
    validateDate,
    validateCreditCardExpirationDate,
    validateCreditCardPostalCode,


}
