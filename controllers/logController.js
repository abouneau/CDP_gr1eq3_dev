const dbconnect = require('../database/dbconnect')
const User = require('../models/logModel')
const bcrypt = require('bcrypt')

exports.authenticate = function (req, res) {
  const email = req.body.email
  const password = req.body.password
  const user = new User(email)
  const collection = dbconnect.client.db('accounts').collection('logins')
  return dbconnect.findElementInDB(user, collection).then(resultUser => {
    if (!resultUser) {
      const error = new Error('User not found.')
      error.status = 401
      console.log(error)
      return null
    } else {
      return bcrypt.compare(password, resultUser._password).then(result => {
        if (result === true) {
          return resultUser
        } else {
          console.log('Invalid password')
          return null
        }
      })
    }
  })
}

exports.createAccount = function (req, res) {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const passwordConf = req.body.passwordConf
  const collection = dbconnect.client.db('accounts').collection('logins')
  if (password !== passwordConf) {
    const err = new Error('Passwords do not match.')
    err.status = 400
    res.send('passwords dont match')
    console.log(err)
  }
  return bcrypt.hash(password, 10).then(encryptedPassword => {
    const user = new User(email, encryptedPassword, username)
    return dbconnect.addElementToDB(user, collection, 'User successfully added').then(user => {
      return user
    })
  })
}

exports.changeUsernameOrPassword = function (req, res) { // Not yet functional
  const mail = req.session.user._id
  const newUsername = req.body.username
  const newPassword = req.body.password
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = new User(mail)
  return bcrypt.hash(newPassword, 10).then(encryptedPassword => {
    const newUser = new User(mail, encryptedPassword, newUsername)
    return dbconnect.updateElementInDB(user, newUser, collection, 'User tied to "' + mail + '" has been succesfully updated.').then(result => {
      return newUser
    })
  })
}

exports.deleteAccount = function (req, res) {
  const mail = req.session.user._id
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail }
  dbconnect.deleteElementFromDB(user, collection, 'User tied to "' + mail + '" has been succesfully deleted.')
}
