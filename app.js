const express = require('express')
const mustache = require('mustache-express')
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use(express.static('public'))


const master = require('./routes/master')
app.use(master)

app.listen(3000, function () {
  console.log('Server ON! Go to Port: 3000')
})
