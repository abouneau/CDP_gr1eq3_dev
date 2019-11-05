const dbconnect = require('./dbconnect')
const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '.', '/'))
app.use(express.static(path.join(__dirname, '..', 'css')))

app.get('/', function (req, res) {
  res.render('backlog')
})

app.get('/task', function (req, res) {
  res.render('task')
})

app.get('/signUp', function (req, res) {
  res.render('signUp')
})

app.get('/signIn', function (req, res) {
  res.render('signIn')
})

app.post('/signUp', function (req, res) {
  const mail = req.body.email
  const username = req.body.username
  const password = req.body.password
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail, _name: username, _password: password }
  dbconnect.addElementToDB(user, collection, 'User "' + username + '" (tied to "' + mail + '") has been succesfully created.')
  res.render('backlog')
})

app.post('/signIn', function (req, res) {
  const mail = req.body.email
  const password = req.body.password
  const collection = dbconnect.client.db('accounts').collection('logins')
  const userToFind = { _id: mail, _password: password }
  const userFound = dbconnect.findElementInDB(userToFind, collection, 'User tied to "' + mail + '" has been connected.', 'Invalid mail or password')
  if (!userFound) {
    res.render('signIn')
    // document.getElementById('error').innerHTML = 'Invalid mail or password'
    // ejs.send('Invalid mail or password')
  } else {
    res.render('backlog')
  }
})

app.listen(8090, function () {
  console.log('App listening on port 8090!')
})

/* function createAccount (mail, username, password) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail, _name: username, _password: password }
  dbconnect.addElementToDB(user, collection, 'User "' + username + '" (tied to "' + mail + '") has been succesfully created.')
} */

/* function changeUsernameOrPassword (mail, newUsername, newPassword) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail }
  const newUser = { $set: { _id: mail, _name: newUsername, _password: newPassword } }
  dbconnect.updateElementInDB(user, newUser, collection, 'User tied to "' + mail + '" has been succesfully updated.')
} */

/* function deleteAccount (mail) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail }
  dbconnect.deleteElementFromDB(user, collection, 'User tied to "' + mail + '" has been succesfully deleted.')
} */

/* function findAccount (mail) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const userToFind = { _id: mail }
  dbconnect.findElementInDB(userToFind, collection, 'User tied to "' + mail + '" has been found.')
} */

// TEST
/* dbconnect.client.connect(err => {
  if (err) throw err
  deleteAccount('user@example.com')
  createAccount('user@example.com', 'user', 'password')
  findAccount('user@example.com')
  changeUsernameOrPassword('user@example.com', 'newUser', 'newPassword')
  findAccount('user@example.com')
  dbconnect.client.close()
}) */
