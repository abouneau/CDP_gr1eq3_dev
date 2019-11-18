/* const express = require('express')
const app = express()
const path = require('path')
const logController = require('../controllers/logController')
const dbconnect = require('../database/dbconnect')
const User = require('../models/logModel')

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', '/views'))
app.use(express.static(path.join(__dirname, '..', 'css')))

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

module.exports = app */

const express = require('express')
const router = express()
const logController = require('../controllers/logController')
const path = require('path')
const User = require('../models/logModel')

router.set('view engine', 'ejs')
router.set('views', path.join(__dirname, '..', '/views'))
router.use(express.static(path.join(__dirname, '..', 'css')))

// GET route for reading data
router.get('/signIn', function (req, res) {
  res.render('signIn')
})

router.get('/signUp', function (req, res) {
  res.render('signUp')
})

router.get('/profile', function (req, res) {
  res.render('profile')
})

router.post('/signIn', function (req, res) {
  logController.authenticate(req, res).then(result => {
    console.log('User = ' + JSON.stringify(result))
    if (result) {
      req.session.user = new User(result._id, result._password, result._name)
      res.redirect('/projects')
    } else {
      res.redirect('/signIn')
    }
  })
})

router.post('/signUp', function (req, res) {
  logController.createAccount(req, res).then(result => {
    const user = result.ops[0]
    req.session.user = new User(user._id, user._password, user._name)
    res.redirect('/projects')
  })
})

/* router.post('/profile', function (req, res) {
  logController.changeUsernameOrPassword(req, res).then(result => {
    req.session.user = new User(result._id, result._password, result._name)
    res.redirect('/projects')
  })
}) */

module.exports = router
