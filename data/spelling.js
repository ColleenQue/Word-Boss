const words = require('../words.json');

let exportedMethods = {
    async getAllPeople() {
        const {x} = words;
        console.log(x)
    },

    async getAllDefintions() {
        const {x} = defintions;
        console.log(x);
        }

    
};



module.exports = {exportedFunction};