function checkifCorrect(guess, word, wordArray, guess_result, count ){
  for (var i = 0; i < word.length; i++) {
    if (guess == word[i]){
      wordArray[i] = guess
      guess_result = true
    }
  }
  if (guess_result == false){
    count -=1
  }
  return wordArray, guess_result, count
}

function guessExisted(guessedArray, guess, existed){
  for (var i = 0; i < guessedArray.length; i++) {
    if (guessedArray.length ==0){
      guessedArray.push(guess)
    }else{
      if (sess.guess == guessedArray[i]){
        existed = true;
      }
    }
  }
  return guessedArray, existed
}
module.exports = {
  checkifCorrect: checkifCorrect,
  guessExisted: guessExisted
}
