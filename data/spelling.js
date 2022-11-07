
module.exports =
{
    spellCheck(word, answer) {
        if (typeof word != 'string'){
            throw 'error: word is not of type string'
        }
        if (typeof answer != 'string'){
            throw 'error: answer is not of type string'
        }
        if (word === answer) {
            return true;
        }
        else {
            return false;
        }
    }
}
