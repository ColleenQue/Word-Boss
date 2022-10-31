import words from './words.json ' assert{type: 'json'};

let list_of_questions = []

// creates the list of questions;
for(let key in words){
    let wrong1 = Math.floor(Math.random()*words.length);
    let wrong2 = Math.floor(Math.random()*words.length);
    let wrong3 = Math.floor(Math.random()*words.length);

    while(wrong1 === wrong2 || wrong1 === wrong3 || wrong2 === wrong3){
        wrong2 = Math.floor(Math.random()*word.length);
        wrong3 = Math.floor(Math.random()*word.length);
    }

    let question = "What word is defined as: " + words[key].defintion;
    let choices = [key[wrong1].word, key[wrong3].word, answer, key[wrong2].word];
    let answer = words[key].word;

    let current_object = {question: question, choices: choices, answer: answer};
    list_of_questions.push(current_object);

}

// for(var i = 0; i < list_of_questions.length; i++){
//     var
// }
