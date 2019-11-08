const dbconnect = require('../database/dbconnect')
const User = require('../models/logModel')

exports.userConnected = ''

/**
 * Create an account given an email, a password and a username,
 * and save it in the collection 'logins' from the database 'accounts').
 * If the email is already used, then the account won't be created, and
 * a message will tell the user about it.
 * It connects the account newly created if successful.
 */
exports.createAccount = function (req, res) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = new User(req.body.email, req.body.password, req.body.username)
  dbconnect.addElementToDB(user, collection, 'User "' + req.body.username + '" (tied to "' + req.body.email + '") has been succesfully created.').then(result => {
    if (result) {
      this.userConnected = req.body.username
      res.redirect('/')
    } else {
      res.render('signUp', { mailError: 'Adresse mail déjà utilisée', user: this.userConnected })
    }
  })
}

/* exports.changeUsernameOrPassword = function (mail, newUsername, newPassword) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail }
  const newUser = { _id: mail, _name: newUsername, _password: newPassword }
  dbconnect.updateElementInDB(user, newUser, collection, 'User tied to "' + mail + '" has been succesfully updated.')
} */

/* exports.deleteAccount = function (mail) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = { _id: mail }
  dbconnect.deleteElementFromDB(user, collection, 'User tied to "' + mail + '" has been succesfully deleted.')
} */

/**
 * Find an account given an email and a password, in order to connect this account.
 * If the account is found, this means the user have entered a correct email and a
 * correct password. If not, then one of the two arguments is wrong, either the email
 * or the password (or even both), a message will tell the user about it.
 */
exports.findAccount = function (req, res) {
  const mail = req.body.email
  const password = req.body.password
  const collection = dbconnect.client.db('accounts').collection('logins')
  const userToFind = new User(mail, password)
  dbconnect.findElementInDB(userToFind, collection, 'User tied to "' + mail + '" has been connected.', 'Invalid mail or password').then(result => {
    if (!result) {
      res.render('signIn', { invalidMail: 'Adresse mail ou mot de passe invalide', user: this.userConnected })
    } else {
      this.userConnected = result._name
      res.redirect('/')
    }
  })
}
