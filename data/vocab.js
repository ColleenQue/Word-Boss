var words = require('../words.json')



let exportedMethods = {
    async getAllPeople() {
        const {x} = words;
        console.log(x)
    }

};

module.exports = exportedMethods;