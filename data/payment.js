const validate = require("../validation");
const mongoCollections=require("../config/mongoCollections");
const users=mongoCollections.users;
const paymentC = mongoCollections.payment;
const validation=require("../validation");
const account = require("./users")
const bcrypt=require('bcrypt');
const saltRounds=12;

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
    if (typeof str != 'string'){
        throw 'Incorrect type'
    }
    if (checkStringHasNumbers(str) != true){
        throw 'Credit card numbers must be provided.';
    }
    if (str.length > 16 || str.length < 15){
        throw 'Not valid input';
    }
    return str;
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

const createPayment = async(username, cname, cardnumber, cvc, cardnumberExp) => {
    let cnameV=validate.checkCname(cname);
    validateCreditCard(cardnumber);
    validateCreditCardCVC(cvc);
    validateCreditCardExpirationDate(cardnumberExp);
    const userCollection=await users();
    const user=await userCollection.findOne({username: username.toLowerCase()});
    const paymentCollections= await paymentC();
    console.log("validated payment awaited collection");
    if(user == null|| user == undefined){
        throw "Error: User is not registered"
    }
    //if child u can not create payment
    // const Children=await account.getAllChildren();
    // console.log(Children);
    // let isChild=false;
    // for (elem of Children){
    //     console.log(elem.username);
    //     if (elem.username == user){
    //         isChild=true;
    //     }
    // }
    // console.log(isChild);
    // if (isChild==true){
    //     throw 'Child can not create payment';
    // // }
    // console.log("hello");
    const findUser2=await paymentCollections.findOne({username: username});
    const cvcHashed=await bcrypt.hash(cvc,saltRounds);
    const cardnumberHashed=await bcrypt.hash(cardnumber,saltRounds);
    let children= user.children;
    // console.log(findUser2);
    if (findUser2 !=null){
        console.log("founduser update Payment");
        
            const updateinfo= await paymentCollections.updateOne({"username": username.toLowerCase()},{$set: {"cname": cnameV, "cardnumber": cardnumberHashed, "cvc": cvcHashed, "cardnumberExp": cardnumberExp, "children": children} });
            return { paymentInserted: true };
    }
    else{
        // console.log("did not find user create Payment");
        //find children


        let CreatePayment = {
            username: username,
            cname: cnameV,
            cardnumber: cardnumberHashed,
            cvc: cvcHashed,
            cardnumberExp: cardnumberExp,
            //list
            children: children
        }
        const insertInfo=await paymentCollections.insertOne(CreatePayment);
        if (!insertInfo.acknowledged || !insertInfo.insertedId){
            throw "Could not add payment";
        }
        
        return { paymentInserted: true };
    }
}
//GetChildren
const CheckParentHasPaymentfromChild = async (username) =>{
    //users
    const paymentCollection= await paymentC();
    const payments= await paymentCollection.find().toArray();
    console.log(payments);
    if (!payments){
        return {paymentParent: false};
    }
    if (payments.length == 0){
        return {paymentParent: false};
    }
    for(obj of payments){
        // console.log(obj);
        if(obj.username==username){
            return { paymentParent: true };
        }
        for (child of obj.children){
            if (child.username==username){
                console.log("trueeeeee");
                return { paymentParent: true };
        }
        else {
            console.log("falseeeee")
            return {paymentParent: false};
        }
    }

        }

        // console.log(elem);
        // if (obj.children.username ==username){
        //     console.log("trueeeeee")
        //     return { paymentParent: true };
        // }
        // else {
        //     console.log("falseeeee")
        //     return {paymentParent: false};
        // }
    }

    // const userCollection=await users();
    // const user=await userCollection.findOne({username: username.toLowerCase()});
    // const paymentuser=await paymentCollections.findOne({username: username.toLowerCase()});
    // if(paymentuser !=null){
    //     return { paymentParent: true };
    // }
    // else {
    //     return {paymentParent: false};
    // }






module.exports ={
    checkStringHasNumbers,
    validateCreditCard,
    validateCreditCardCVC,
    validateDate,
    validateCreditCardExpirationDate,
    validateCreditCardPostalCode,
    createPayment,
    CheckParentHasPaymentfromChild,
}
