import words from './words.json ' assert{type: 'json'};




for(let key in words){
    let wrong1 = Math.floor(Math.random()*words.length);
    let wrong2 = Math.floor(Math.random()*words.length);
    let wrong3 = Math.floor(Math.random()*words.length);

    while(wrong1 === wrong2 || wrong1 === wrong3 || wrong2 === wrong3){
        wrong2 = Math.floor(Math.random()*word.length);
        wrong3 = Math.floor(Math.random()*word.length);
    }

    
}
