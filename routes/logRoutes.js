const express = require('express')
const router = express()
const logController = require('../controllers/logController')
const path = require('path')
const User = require('../models/logModel')

router.set('view engine', 'ejs')
router.set('views', path.join(__dirname, '..', '/views'))
router.use(express.static(path.join(__dirname, '..', 'css')))

router.get('/', function (req, res) {
  res.redirect('/signIn')
})

router.get('/signIn', function (req, res) {
  res.render('signIn')
})

router.get('/signUp', function (req, res) {
  res.render('signUp')
})

router.get('/signOut', function (req, res) {
  req.session.user = undefined
  res.redirect('/')
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

router.post('/profile', function (req, res) {
  logController.changeUsernameOrPassword(req, res).then(result => {
    req.session.user = new User(result._id, result._password, result._name)
    res.redirect('/projects')
  })
})

router.get('/deleteAccount', function (req, res) {
  logController.deleteAccount(req, res)
  req.session.user = undefined
  res.redirect('/')
})

module.exports = router
