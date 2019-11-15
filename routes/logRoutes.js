const express = require('express')
const app = express()
const path = require('path')
const logController = require('../controllers/logController')
const dbconnect = require('../database/dbconnect')
const User = require('../models/logModel')

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', '/views'))
app.use(express.static(path.join(__dirname, '..', 'css')))

// app.get('/tasks', function (req, res) {
//   res.render('task', { user: logController.userConnected })
// })

app.get('/signUp', function (req, res) {
  res.render('signUp', { mailError: '', user: logController.userConnected })
})

app.get('/signIn', function (req, res) {
  res.render('signIn', { invalidMail: '', user: logController.userConnected })
})

app.get('/signOut', function (req, res) {
  logController.userConnected = ''
  res.redirect('/')
})

app.get('/user/:id/profile', function (req, res) {
  const userToFind = new User(req.params.id)
  const collection = dbconnect.client.db('accounts').collection('logins')
  dbconnect.findElementInDB(userToFind, collection).then(result => {
    res.render('profile', { user: logController.userConnected, userToSee: result })
  })
})

app.get('/user/:id/deleteAccount', function (req, res) {
  console.log('Account tied to ' + req.params.id + ' wants to delete account tied to ' + logController.userConnected._id + '.')
  if (req.params.id === logController.userConnected._id) {
    logController.deleteAccount(req, res)
    logController.userConnected = ''
  } else {
    console.log('Account not deleted.')
  }
  res.redirect('/')
})

app.post('/signUp', function (req, res) {
  logController.createAccount(req, res)
})

app.post('/signIn', function (req, res) {
  logController.findAccount(req, res)
})

app.post('/user/:id/profile', function (req, res) {
  logController.changeUsernameOrPassword(req, res)
  res.redirect('/')
})

module.exports = app
