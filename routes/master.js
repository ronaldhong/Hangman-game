const express = require('express')
const router = express.Router()
const Word = require('../models/word')
const Guess = require('../models/check')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(session({
  secret: 'catslaveshelp',
  resave: false,
  saveUninitialized: true
}))
router.use(expressValidator())


let word;
let blankArray=[];
let count;
let guessedArray=[];
let message ="";
let solution ="";
let result_message ="";
let array_display;
let guessedArrayDisplay =[];
let game;

router.get('/',function(req, res){
  game = true;
  result_message= ""
  count = 8
  guessedArray = []
  array_display = false;
  guessedArrayDisplay = []
  // word = Word.createNewWord()
  // wordArray = Word.blankArray(word)
  res.render("homepage",{
    game: true
  })
})
router.post('/',function(req,res){
  let difficulty = req.body.difficulty;
  word = Word.createNewWord(difficulty)
  wordArray = Word.blankArray(word)
  res.redirect('/game')
})

router.get('/game',function(req,res){
  guessedArrayDisplay =guessedArray.join(', ')
  arrayDisplay = wordArray.join(' ')
  res.render("homepage",{
    game: false,
    solution: solution,
    arrayDisplay: arrayDisplay,
    count: count,
    message: message,
    result_message: result_message,
    array_display: array_display,
    guessedArrayDisplay: guessedArrayDisplay
  })
})

router.post('/game',function(req,res){
  console.log(word);
  message = ''
  existed = false
  solution = ""
  // validation for guess input
  req.checkBody('guess', 'Guess must be a single letter').isAlpha().notEmpty().len(1, 1)
  let errors = req.validationErrors(true)
  if (errors) {
    message = errors.guess.msg
    return res.redirect('/game')
  };
  ///
  let guess_result=false;
  sess = req.session;
  sess.guess = req.body.guess;
  ///check if guess the same letter twice
  guessedArray, existed = Guess.guessExisted(guessedArray, sess.guess, existed);
  if (existed == true){
    message = "Can not guess the same letter twice"
    return res.redirect('/game')
  }else{
    guessedArray.push(sess.guess)
  }
  ///
  wordArray, word, guess_result, count = Guess.checkifCorrect(sess.guess, word, wordArray, guess_result, count)
  if (count == 0){
    result_message = "You Lose =(( "
    solution = word
  }
  if(wordArray.join("")==word){
    result_message = "Congratulation! You have won the game!!"
    array_display = true;
  }
  res.redirect('/game')
})


module.exports = router;
