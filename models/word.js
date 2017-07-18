const fs = require('fs')
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')

function createNewWord(){
  let word = words[Math.floor(Math.random() * words.length)]
  return word
}
function blankArray(word){
  arrayWord =[]
  for (var i = 0; i < word.length; i++) {
    arrayWord.push("_")
  }
  return arrayWord
}

let word= createNewWord();
module.exports = {
  createNewWord: createNewWord,
  blankArray: blankArray
}
