class User {
  constructor (mail, password, username) {
    this._id = mail
    if (username) {
      this._name = username
    }
    this._password = password
  }
}

module.exports = User
