const fs = require('fs')
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n')

function createNewWord(difficulty){
  let word = words[Math.floor(Math.random() * words.length)]
  if (difficulty == 'easy') {
    while (word.length > 6 || word.length < 4) {
      word = words[Math.floor(Math.random() * words.length)]
    }
  } else if (difficulty == 'normal') {
    while (word.length > 8 || word.length < 6) {
      word = words[Math.floor(Math.random() * words.length)]
    }
  } else if (difficulty == 'hard') {
    while (word.length < 8) {
      word = words[Math.floor(Math.random() * words.length)]
    }
  }
  return word
}


function blankArray(word){
  arrayWord =[]
  for (var i = 0; i < word.length; i++) {
    arrayWord.push("_")
  }
  return arrayWord
}

module.exports = {
  createNewWord: createNewWord,
  blankArray: blankArray
}
