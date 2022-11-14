const vocab = require('../data/vocab');

let exportedMethods = {
    shuffle(array){
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    },
    async generateQuestion(){
        let questionObj = vocab.Random();
        let curr_definition = questionObj.definition;
        let [wrong1, wrong2, wrong3] = [vocab.Random(),vocab.Random(),vocab.Random()];
        let wrong = [wrong1.word, wrong2.word, wrong3.word];
        let choices = [questionObj.word].concat(wrong);
        choices = this.shuffle(choices);
        return [questionObj.word, curr_definition, choices];
    }
};

module.exports = exportedMethods;