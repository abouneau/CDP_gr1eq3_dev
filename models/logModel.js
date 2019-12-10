class User {
/**
   * Constructs a new user
   * @param {String} mail The mail to link with that user
   * @param {String} password The password to link with that user
   * @param {String} username The username to link with that user (no field if not provided as argument)
   */
  constructor (mail, password, username) {
    this._id = mail
    if (username) {
      this._name = username
    }
    if (password) {
      this._password = password
    }
  }
}

module.exports = User
