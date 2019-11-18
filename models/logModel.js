class User {
/**
   * Constructs a new user
   * @param {*} mail The mail to link with that user
   * @param {*} password The password to link with that user
   * @param {*} username The username to link with that user (no field if not provided as argument)
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
