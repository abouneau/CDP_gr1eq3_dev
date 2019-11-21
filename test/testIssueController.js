const assert = require("assert")
const issueController = require("../controllers/issueController")
const dbconnect = require("../database/dbconnect")
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://collabcdp2019:cdp2019@cdp2019-iaivu.gcp.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })

client.connect().then(() => {
    const collection = dbconnect.client.db('Projets').collection('Issues')
    if(dbconnect.elementExists({_id: 'id'}, collection)){
        dbconnect.deleteElementFromDB({_id: 'id'}, collection, 'Element deleted')
    }
})


describe('Test les fonctions de issueController.js', function(){

    it('Test de createIssue', function() {

        client.connect().then(() => {
            const id = 'id'
            const projectID = 'project'
            const name = 'name'
            const description = 'desc'
            const priority = 5
            const difficulty = 5
            const body = {id, name, description, priority, difficulty}
            const params = {projectID}
            const req = {body, params}
            const res = null
            issueController.createIssue(req, res)

            element = {_id: req.body.id}

            const collection = dbconnect.client.db('Projets').collection('Issues')
            
            issueCreated = dbconnect.findElementInDB(element, collection, 'found', 'not found')
            assert.equal(issueCreated._id, 'id')
            assert.equal(issueCreated._projectID, 'project')
            assert.equal(issueCreated._name, 'name')
            assert.equal(issueCreated._description, 'desc')
            assert.equal(issueCreated._priority, 5)
            assert.equal(issueCreated._difficulty, 5)
            assert.equal(issueCreated._state, 'toDo')
            assert.equal(issueCreated._color, 'alert-danger')
        })
    })

    it('Test de getIssue', function() {

        client.connect().then(() => {
            issue = issueController.getIssue('id')

            assert.equal(issue._id, 'id')
            assert.equal(issue._projectID, 'project')
            assert.equal(issue._name, 'name')
            assert.equal(issue._description, 'desc')
            assert.equal(issue._priority, 5)
            assert.equal(issue._difficulty, 5)
            assert.equal(issue._state, 'toDo')
            assert.equal(issue._color, 'alert-danger')
        })
    })

    it('Test de getAllIssue', function() {

        client.connect().then(() => {
            issues = issueController.getAllIssues('project')

            assert.equal(issues[0]._id, 'id')
            assert.equal(issues[0]._projectID, 'project')
            assert.equal(issues[0]._name, 'name')
            assert.equal(issues[0]._description, 'desc')
            assert.equal(issues[0]._priority, 5)
            assert.equal(issues[0]._difficulty, 5)
            assert.equal(issues[0]._state, 'toDo')
            assert.equal(issues[0]._color, 'alert-danger')
        })
    })

    it('Test de updateIssue état toDo', function() {

        client.connect().then(() => {
            const id = 'id'
            const projectID = 'project1'
            const name = 'name1'
            const description = 'desc1'
            const priority = 6
            const difficulty = 6
            const state = 'toDo'
            const body = {name, description, priority, difficulty, state}
            const params = {id, projectID}
            const req = {body, params}
            const res = null
            issueController.updateIssue(req, res)

            element = {_id: req.body.id}

            const collection = dbconnect.client.db('Projets').collection('Issues')
            
            issueUpdated = dbconnect.findElementInDB(element, collection, 'found', 'not found')
            assert.equal(issueCreated._id, 'id')
            assert.equal(issueCreated._projectID, 'project1')
            assert.equal(issueCreated._name, 'name1')
            assert.equal(issueCreated._description, 'desc1')
            assert.equal(issueCreated._priority, 6)
            assert.equal(issueCreated._difficulty, 6)
            assert.equal(issueCreated._state, 'toDo')
            assert.equal(issueCreated._color, 'alert-danger')
        })
    })

    it('Test de updateIssue état onGoing', function() {

        client.connect().then(() => {
            const id = 'id'
            const projectID = 'project1'
            const name = 'name1'
            const description = 'desc1'
            const priority = 6
            const difficulty = 6
            const state = 'onGoing'
            const body = {name, description, priority, difficulty, state}
            const params = {id, projectID}
            const req = {body, params}
            const res = null
            issueController.updateIssue(req, res)

            element = {_id: req.body.id}

            const collection = dbconnect.client.db('Projets').collection('Issues')
            
            issueUpdated = dbconnect.findElementInDB(element, collection, 'found', 'not found')
            assert.equal(issueCreated._id, 'id')
            assert.equal(issueCreated._projectID, 'project1')
            assert.equal(issueCreated._name, 'name1')
            assert.equal(issueCreated._description, 'desc1')
            assert.equal(issueCreated._priority, 6)
            assert.equal(issueCreated._difficulty, 6)
            assert.equal(issueCreated._state, 'onGoing')
            assert.equal(issueCreated._color, 'alert-warning')
        })
    })

    it('Test de updateIssue état end', function() {

        client.connect().then(() => {
            const id = 'id'
            const projectID = 'project1'
            const name = 'name1'
            const description = 'desc1'
            const priority = 6
            const difficulty = 6
            const state = 'end'
            const body = {name, description, priority, difficulty, state}
            const params = {id, projectID}
            const req = {body, params}
            const res = null
            issueController.updateIssue(req, res)

            element = {_id: req.body.id}

            const collection = dbconnect.client.db('Projets').collection('Issues')
            
            issueUpdated = dbconnect.findElementInDB(element, collection, 'found', 'not found')
            assert.equal(issueCreated._id, 'id')
            assert.equal(issueCreated._projectID, 'project1')
            assert.equal(issueCreated._name, 'name1')
            assert.equal(issueCreated._description, 'desc1')
            assert.equal(issueCreated._priority, 6)
            assert.equal(issueCreated._difficulty, 6)
            assert.equal(issueCreated._state, 'end')
            assert.equal(issueCreated._color, 'alert-success')
        })
    })

    it('Test de deleteIssue', function() {

        client.connect().then(() => {
            id = 'id'
            const params = {id}
            const req = {params}
            const res = null

            issueController.deleteIssue(req, res)

            element = {_id: req.params.id}

            const collection = dbconnect.client.db('Projets').collection('Issues')

            issueDeleted = dbconnect.elementExists(element, collection)
            assert.equal(issueDeleted, false)
        })
    })
})