const assert = require('assert')
const issueController = require('../controllers/issueController')
const dbconnect = require('../database/dbconnect')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })

client.connect().then(() => {
  const collection = dbconnect.client.db('Projets').collection('Issues')
  if (dbconnect.elementExists({ _id: 'id' }, collection).catch(err => {
    throw err
  })) {
    dbconnect.deleteElementFromDB({ _id: 'id' }, collection, 'Element deleted').catch(err => {
      throw err
    })
  }
}).catch(err => {
  throw err
})

describe('Test les fonctions de issueController.js', function () { // eslint-disable-line no-undef
  it('Test de createIssue', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      const id = 'id'
      const projectID = 'project'
      const name = 'name'
      const description = 'desc'
      const priority = 5
      const difficulty = 5
      const body = { id, name, description, priority, difficulty }
      const params = { projectID }
      const req = { body, params }
      const res = null
      issueController.createIssue(req, res)

      const element = { _id: req.body.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.findElementInDB(element, collection, 'found', 'not found').then(issueCreated => {
        if (issueCreated) {
          assert.strictEqual(issueCreated._id, 'id')
          assert.strictEqual(issueCreated._projectID, 'project')
          assert.strictEqual(issueCreated._name, 'name')
          assert.strictEqual(issueCreated._description, 'desc')
          assert.strictEqual(issueCreated._priority, 5)
          assert.strictEqual(issueCreated._difficulty, 5)
          assert.strictEqual(issueCreated._state, 'toDo')
          assert.strictEqual(issueCreated._color, 'alert-danger')
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })

  it('Test de getIssue', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      issueController.getIssue('id').then(issue => {
        if (issue) {
          assert.strictEqual(issue._id, 'id')
          assert.strictEqual(issue._projectID, 'project')
          assert.strictEqual(issue._name, 'name')
          assert.strictEqual(issue._description, 'desc')
          assert.strictEqual(issue._priority, 5)
          assert.strictEqual(issue._difficulty, 5)
          assert.strictEqual(issue._state, 'toDo')
          assert.strictEqual(issue._color, 'alert-danger')
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })

  it('Test de getAllIssue', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      issueController.getAllIssues('project').then(issues => {
        if (issues[0]) {
          assert.strictEqual(issues[0]._id, 'id')
          assert.strictEqual(issues[0]._projectID, 'project')
          assert.strictEqual(issues[0]._name, 'name')
          assert.strictEqual(issues[0]._description, 'desc')
          assert.strictEqual(issues[0]._priority, 5)
          assert.strictEqual(issues[0]._difficulty, 5)
          assert.strictEqual(issues[0]._state, 'toDo')
          assert.strictEqual(issues[0]._color, 'alert-danger')
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })

  it('Test de updateIssue état toDo', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      const id = 'id'
      const projectID = 'project1'
      const name = 'name1'
      const description = 'desc1'
      const priority = 6
      const difficulty = 6
      const state = 'toDo'
      const body = { name, description, priority, difficulty, state }
      const params = { id, projectID }
      const req = { body, params }
      const res = null
      issueController.updateIssue(req, res).catch(err => {
        throw err
      })

      const element = { _id: req.body.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.findElementInDB(element, collection, 'found', 'not found').then(issueUpdated => {
        if (issueUpdated) {
          assert.strictEqual(issueUpdated._id, 'id')
          assert.strictEqual(issueUpdated._projectID, 'project1')
          assert.strictEqual(issueUpdated._name, 'name1')
          assert.strictEqual(issueUpdated._description, 'desc1')
          assert.strictEqual(issueUpdated._priority, 6)
          assert.strictEqual(issueUpdated._difficulty, 6)
          assert.strictEqual(issueUpdated._state, 'toDo')
          assert.strictEqual(issueUpdated._color, 'alert-danger')
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })

  it('Test de updateIssue état onGoing', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      const id = 'id'
      const projectID = 'project1'
      const name = 'name1'
      const description = 'desc1'
      const priority = 6
      const difficulty = 6
      const state = 'onGoing'
      const body = { name, description, priority, difficulty, state }
      const params = { id, projectID }
      const req = { body, params }
      const res = null
      issueController.updateIssue(req, res).catch(err => {
        throw err
      })

      const element = { _id: req.body.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.findElementInDB(element, collection, 'found', 'not found').then(issueUpdated => {
        if (issueUpdated) {
          assert.strictEqual(issueUpdated._id, 'id')
          assert.strictEqual(issueUpdated._projectID, 'project1')
          assert.strictEqual(issueUpdated._name, 'name1')
          assert.strictEqual(issueUpdated._description, 'desc1')
          assert.strictEqual(issueUpdated._priority, 6)
          assert.strictEqual(issueUpdated._difficulty, 6)
          assert.strictEqual(issueUpdated._state, 'onGoing')
          assert.strictEqual(issueUpdated._color, 'alert-warning')
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })

  it('Test de updateIssue état end', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      const id = 'id'
      const projectID = 'project1'
      const name = 'name1'
      const description = 'desc1'
      const priority = 6
      const difficulty = 6
      const state = 'end'
      const body = { name, description, priority, difficulty, state }
      const params = { id, projectID }
      const req = { body, params }
      const res = null
      issueController.updateIssue(req, res).catch(err => {
        throw err
      })

      const element = { _id: req.body.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.findElementInDB(element, collection, 'found', 'not found').then(issueUpdated => {
        if (issueUpdated) {
          assert.strictEqual(issueUpdated._id, 'id')
          assert.strictEqual(issueUpdated._projectID, 'project1')
          assert.strictEqual(issueUpdated._name, 'name1')
          assert.strictEqual(issueUpdated._description, 'desc1')
          assert.strictEqual(issueUpdated._priority, 6)
          assert.strictEqual(issueUpdated._difficulty, 6)
          assert.strictEqual(issueUpdated._state, 'end')
          assert.strictEqual(issueUpdated._color, 'alert-success')
        }
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      throw err
    })
  })

  it('Test de deleteIssue', function () { // eslint-disable-line no-undef
    client.connect().then(() => {
      const id = 'id'
      const params = { id }
      const req = { params }
      const res = null

      issueController.deleteIssue(req, res).catch(err => {
        throw err
      })

      const element = { _id: req.params.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')
      let exists = true
      dbconnect.elementExists(element, collection).then(result => {
        exists = result
      }).catch(err => {
        throw err
      })
      assert.strictEqual(exists, false)
    }).catch(err => {
      throw err
    })
  })
})
