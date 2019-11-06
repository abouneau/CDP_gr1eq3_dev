const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const logController = require('./logController')

// let userConnected = ''

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '.', '/views'))
app.use(express.static(path.join(__dirname, '..', 'css')))

app.get('/', function (req, res) {
  res.render('backlog', { user: logController.userConnected })
})

app.get('/task', function (req, res) {
  res.render('task', { user: logController.userConnected })
})

app.get('/signUp', function (req, res) {
  res.render('signUp', { mailError: '', user: logController.userConnected })
})

app.get('/signIn', function (req, res) {
  res.render('signIn', { invalidMail: '', user: logController.userConnected })
})

app.get('/signOut', function (req, res) {
  logController.userConnected = ''
  res.render('backlog', { user: logController.userConnected })
})

app.post('/signUp', function (req, res) {
  logController.createAccount(req, res)
})

app.post('/signIn', function (req, res) {
  logController.findAccount(req, res)
})

/* app.listen(3001, function () {
  console.log('App listening on port 3001!')
}) */

module.exports = app
