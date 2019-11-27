const assert = require('assert')
const logController = require('../controllers/logController')
const dbconnect = require('../database/dbconnect')
const bcrypt = require('bcrypt')

describe('Test des fonctions de logController.js', function () {
  it('Test de createAccount', function () {
    const collection = dbconnect.client.db('accounts').collection('logins')
    if (dbconnect.elementExists({ _id: 'test@example.com' }, collection)) {
      dbconnect.deleteElementFromDB({ _id: 'test@example.com' }, collection, 'Account deleted')
    }
    const email = 'test@example.com'
    const username = 'test'
    const password = 'password'
    const passwordConf = 'password'
    const body = { email, username, password, passwordConf }
    const req = { body }
    const res = null
    logController.createAccount(req, res).then(result => {
      const element = { _id: req.body.email }
      dbconnect.findElementInDB(element, collection, 'found', 'not found').then(accountCreated => {
        assert.strictEqual(accountCreated._id, 'test@example.com')
        assert.strictEqual(accountCreated._name, 'test')
        bcrypt.compare('password', accountCreated._password).then(result => {
          assert.strictEqual(true, result)
        })
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })
  })

  it('Test de authenticate', function () {
    const email = 'test@example.com'
    const password = 'password'
    const body = { email, password }
    const req = { body }
    const res = null
    logController.authenticate(req, res).then(user => {
      assert.strictEqual(user._id, 'test@example.com')
      assert.strictEqual(user._name = 'test')
      bcrypt.compare('password', user._password).then(result => {
        assert.strictEqual(true, result)
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error)
    })
  })
})
