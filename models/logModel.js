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

// authenticate input against database
/* UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        const error = new Error('User not found.')
        error.status = 401
        return callback(error)
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) throw err
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      })
    })
}

// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
}) */
