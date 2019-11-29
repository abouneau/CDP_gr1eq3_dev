const assert = require('assert')
const logController = require('../controllers/logController')
const dbconnect = require('../database/dbconnect')
const bcrypt = require('bcrypt')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })

client.connect().then(() => {
  const collection = dbconnect.client.db('accounts').collection('logins')
  if (dbconnect.elementExists({ _id: 'test@example.com' }, collection).catch(err => {
    throw err
  })) {
    dbconnect.deleteElementFromDB({ _id: 'test@example.com' }, collection, 'Account deleted').catch(err => {
      throw err
    })
  }
}).catch(err => {
  throw err
})

describe('Test des fonctions de logController.js', function () { // eslint-disable-line no-undef
  it('Test de createAccount', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      const collection = dbconnect.client.db('accounts').collection('logins')
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
          if (accountCreated) {
            assert.strictEqual(accountCreated._id, 'test@example.com')
            assert.strictEqual(accountCreated._name, 'test')
            bcrypt.compare('password', accountCreated._password).then(result => {
              assert.strictEqual(true, result)
            }).catch(err => {
              throw err
            })
          } else {
            throw new Error('User not found')
          }
        }).catch(err => {
          throw err
        })
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })

  it('Test de authenticate', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      const email = 'test@example.com'
      const password = 'password'
      const body = { email, password }
      const req = { body }
      const res = null
      logController.authenticate(req, res).then(user => {
        if (user) {
          assert.strictEqual(user._id, 'test@example.com')
          assert.strictEqual(user._name = 'test')
          bcrypt.compare('password', user._password).then(result => {
            assert.strictEqual(true, result)
          }).catch(err => {
            throw err
          })
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })
})
