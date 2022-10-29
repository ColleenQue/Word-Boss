var words = require('../words.json')
const mongoCollections=require("../config/mongoCollections");
const myWords =mongoCollections.myWords;
const { ObjectId } = require("mongodb");


let exportedMethods = {
    getAllWords() {
        //5000 words in local inventory
        return words;
    },

    Random(){
        var length = words.length;
        var rand = Math.floor(Math.random()*length);
        return words[rand];
    },

    async getAll(){
        //0-5000 generated words according to the day 
        const wordCollection = await words();
        const wordList = await wordCollection.find({}).toArray();
        return wordList
    },

    async WordToday(){
        //add new word for the day

        var date = new Date();
        date.setHours(0, 0, 0, 0);

        var word = this.Random();

        //TODO CHECK IF WORD EXISTS ALREADY
        let newWord = {
            _id: ObjectId(),
            date: date, 
            word: word
        }
        const wordCollection = await myWords();


        //check if day already exists
        const findWord = await wordCollection.findOne({ date: date });
        if(findWord){
            return findWord;
        }

        //add new word to data
        await wordCollection.insertOne(newWord);
        return newWord;
    }

};

module.exports = exportedMethods;