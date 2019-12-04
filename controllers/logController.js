/**
 * Module containing all methods necessary to log a user
 * @module logController
 */

const dbconnect = require('../database/dbconnect')
const User = require('../models/logModel')
const bcrypt = require('bcrypt')

/**
 * Create a new account given an email, a username and (twice) a password.
 * If the email is already in use for an account, then an error is thrown,
 * and the account will not be created.
 * @param {object} req - the request containing the email, the username and the password (twice) in its body
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the account will be created if possible, then the created account
 */
exports.createAccount = function (req, res) {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const passwordConf = req.body.passwordConf
  const collection = dbconnect.client.db('accounts').collection('logins')
  if (password !== passwordConf) {
    const err = new Error('Passwords do not match.')
    err.status = 400
    res.send('Passwords do not match.')
    console.log(err)
  }
  return bcrypt.hash(password, 10).then(encryptedPassword => {
    const user = new User(email, encryptedPassword, username)
    return dbconnect.addElementToDB(user, collection, 'User successfully added').then(user => {
      return user
    }).catch(err => {
      throw err
    })
  })
}

/**
 * Authenticate a user based on its email and password. If the user does not exist,
 * it cannot be authenticated, so nothing happens
 * @param {object} req - the request containing the email and the password in its body
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the user will be authenticated if possible, then the authenticated account
 */
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
  }).catch(err => {
    throw err
  })
}

/**
 * Update an account given a new username, an old password and (twice) a new password.
 * The email is taken from the session, so it cannot be changed.
 * @param {object} req - the request containing the email in its session user, as well as the username, the old and the new password (twice) in its body
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the account will be updated if possible, then the updated account
 */
exports.changeUsernameOrPassword = function (req, res) {
  const mail = req.session.user._id
  const newUsername = req.body.username
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.password
  const newPasswordConf = req.body.passwordConf
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = new User(mail)
  return dbconnect.findElementInDB(user, collection).then(resultUser => {
    if (!resultUser) {
      const error = new Error('User not found.')
      error.status = 401
      console.log(error)
      return null
    } else {
      return bcrypt.compare(oldPassword, resultUser._password).then(result => {
        if (result === true) {
          if (newPassword !== newPasswordConf) {
            const err = new Error('Passwords do not match.')
            err.status = 400
            res.send('Les mots de passe ne correspondent pas')
            console.log(err)
            return null
          } else {
            return bcrypt.hash(newPassword, 10).then(encryptedPassword => {
              const newUser = new User(mail, encryptedPassword, newUsername)
              return dbconnect.updateElementInDB(user, newUser, collection, 'User tied to "' + mail + '" has been succesfully updated.').then(result => {
                return newUser
              }).catch(err => {
                throw err
              })
            })
          }
        } else {
          const err = new Error('Invalid password.')
          err.status = 400
          res.send('Le mot de passe est invalide')
          console.log(err)
          console.log('Invalid password')
          return null
        }
      })
    }
  })
}

/**
 * Delete an account. The email is taken from the session, so only the connected user's account can be deleted.
 * @param {object} req - the request containing the email in its session user
 * @param {object} res - the response where the new app state will be stored
 */
exports.deleteAccount = function (req, res) {
  const mail = req.session.user._id
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail }
  dbconnect.deleteElementFromDB(user, collection, 'User tied to "' + mail + '" has been succesfully deleted.').catch(err => {
    throw err
  })
}

/**
 * See all accounts.
 * @return {promise} The promise that all users will be found if possible, then the user list
 */
exports.getAllUsers = function () {
  const collection = dbconnect.client.db('accounts').collection('logins')
  return dbconnect.getWholeCollection(collection)
    .then(users => {
      return users
    }).catch(err => {
      throw err
    })
}
