const dbconnect = require('./database/dbconnect')
const User = require('./logModel')

exports.userConnected = ''

exports.createAccount = function (req, res) {
  const collection = dbconnect.client.db('accounts').collection('logins')
  const user = new User(req.body.email, req.body.username, req.body.password)
  dbconnect.addElementToDB(user, collection, 'User "' + req.body.username + '" (tied to "' + req.body.email + '") has been succesfully created.').then(result => {
    if (result) {
      this.userConnected = req.body.username
      res.render('backlog', { user: this.userConnected })
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
      res.render('backlog', { user: this.userConnected })
    }
  })
}
