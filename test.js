const vocab = require("./data/vocab");
const spelling = require("./data/spelling");

/*
test("test get all words ", () => {
    expect(vocab.getAllWords()[0]).toBe(obj1);
});
*/

async function testVocab(){
    try{
        const word = await vocab.WordToday();
        console.log(word);
    }
    catch(e){
        console.log(e);
    }


    //second generation should give the same word
    try{
        const word = await vocab.WordToday();
        console.log(word);
    }
    catch(e){
        console.log(e);
    }

}

async function allWords(){
    try{
        const all = await vocab.getAll();
        console.log(all);
    }
    catch(e){
        console.log(e);
    }
}

async function allwords2(){
    try{
        const all = await vocab.getAllWords();
        console.log(all);
    }
    catch(e){
        console.log(e);
    }
}

function spellCheck(){
    console.log(spelling.spellCheck("hi","hi"));
    console.log(spelling.spellCheck("",""));
    console.log(spelling.spellCheck("","/"));
    
}



allWords();
allwords2();
spellCheck();
testVocab();