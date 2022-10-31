const words = require('./words.json');
var length = words.length;
var rand = Math.floor(Math.random()*length);
console.log(words[rand]);
