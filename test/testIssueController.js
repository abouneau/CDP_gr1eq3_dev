const assert = require('assert')
const issueController = require('../controllers/issueController')
const dbconnect = require('../database/dbconnect')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })

client.connect().then(() => {
  const collection = dbconnect.client.db('Projets').collection('Issues')
  if (dbconnect.elementExists({ _id: 'id' }, collection)) {
    dbconnect.deleteElementFromDB({ _id: 'id' }, collection, 'Element deleted')
  }
})

describe('Test les fonctions de issueController.js', function () {

  it('Test de createIssue', function () {

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

      dbconnect.findElementInDB(element, collection, 'found', 'not found')
        .then(issueCreated => {
          assert.strictEqual(issueCreated._id, 'id')
          assert.strictEqual(issueCreated._projectID, 'project')
          assert.strictEqual(issueCreated._name, 'name')
          assert.strictEqual(issueCreated._description, 'desc')
          assert.strictEqual(issueCreated._priority, 5)
          assert.strictEqual(issueCreated._difficulty, 5)
          assert.strictEqual(issueCreated._state, 'toDo')
          assert.strictEqual(issueCreated._color, 'alert-danger')
        })
    })
  })

  it('Test de getIssue', function () {

    client.connect().then(() => {
      issueController.getIssue('id')
        .then(issue => {
          assert.strictEqual(issue._id, 'id')
          assert.strictEqual(issue._projectID, 'project')
          assert.strictEqual(issue._name, 'name')
          assert.strictEqual(issue._description, 'desc')
          assert.strictEqual(issue._priority, 5)
          assert.strictEqual(issue._difficulty, 5)
          assert.strictEqual(issue._state, 'toDo')
          assert.strictEqual(issue._color, 'alert-danger')
        })
    })
  })

  it('Test de getAllIssue', function () {

    client.connect().then(() => {
      issueController.getAllIssues('project')
        .then(issues => {
          assert.strictEqual(issues[0]._id, 'id')
          assert.strictEqual(issues[0]._projectID, 'project')
          assert.strictEqual(issues[0]._name, 'name')
          assert.strictEqual(issues[0]._description, 'desc')
          assert.strictEqual(issues[0]._priority, 5)
          assert.strictEqual(issues[0]._difficulty, 5)
          assert.strictEqual(issues[0]._state, 'toDo')
          assert.strictEqual(issues[0]._color, 'alert-danger')
        })
    })
  })

  it('Test de updateIssue état toDo', function () {

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
      issueController.updateIssue(req, res)

      const element = { _id: req.body.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.findElementInDB(element, collection, 'found', 'not found')
        .then(issueUpdated => {
          assert.strictEqual(issueUpdated._id, 'id')
          assert.strictEqual(issueUpdated._projectID, 'project1')
          assert.strictEqual(issueUpdated._name, 'name1')
          assert.strictEqual(issueUpdated._description, 'desc1')
          assert.strictEqual(issueUpdated._priority, 6)
          assert.strictEqual(issueUpdated._difficulty, 6)
          assert.strictEqual(issueUpdated._state, 'toDo')
          assert.strictEqual(issueUpdated._color, 'alert-danger')
        })
    })
  })

  it('Test de updateIssue état onGoing', function () {

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
      issueController.updateIssue(req, res)

      const element = { _id: req.body.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.findElementInDB(element, collection, 'found', 'not found')
        .then(issueUpdated => {
          assert.strictEqual(issueUpdated._id, 'id')
          assert.strictEqual(issueUpdated._projectID, 'project1')
          assert.strictEqual(issueUpdated._name, 'name1')
          assert.strictEqual(issueUpdated._description, 'desc1')
          assert.strictEqual(issueUpdated._priority, 6)
          assert.strictEqual(issueUpdated._difficulty, 6)
          assert.strictEqual(issueUpdated._state, 'onGoing')
          assert.strictEqual(issueUpdated._color, 'alert-warning')
        })
    })
  })

  it('Test de updateIssue état end', function () {

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
      issueController.updateIssue(req, res)

      const element = { _id: req.body.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.findElementInDB(element, collection, 'found', 'not found')
        .then(issueUpdated => {
          assert.strictEqual(issueUpdated._id, 'id')
          assert.strictEqual(issueUpdated._projectID, 'project1')
          assert.strictEqual(issueUpdated._name, 'name1')
          assert.strictEqual(issueUpdated._description, 'desc1')
          assert.strictEqual(issueUpdated._priority, 6)
          assert.strictEqual(issueUpdated._difficulty, 6)
          assert.strictEqual(issueUpdated._state, 'end')
          assert.strictEqual(issueUpdated._color, 'alert-success')
        })
    })
  })

  it('Test de deleteIssue', function () {

    client.connect().then(() => {
      const id = 'id'
      const params = { id }
      const req = { params }
      const res = null

      issueController.deleteIssue(req, res)

      const element = { _id: req.params.id }

      const collection = dbconnect.client.db('Projets').collection('Issues')

      dbconnect.elementExists(element, collection)
        .then(issueDeleted => {
          assert.strictEqual(issueDeleted, false)
        })
    })
  })
})
