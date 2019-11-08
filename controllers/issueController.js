const Issue = require('../models/issueModel')
const dbconnect = require('../database/dbconnect')
const logController = require('../controllers/logController')

function getBacklogPage (req, res) {
  const collection = dbconnect.client.db('Projet1').collection('issues')
  dbconnect.getWholeCollection(collection)
    .then(issues => {
      res.render('../views/backlog.ejs', { issues: issues, user: logController.userConnected })
    }
    )
}

function getAddPage (req, res) {
  console.log('get')
  res.render('../views/addIssue.ejs', { user: logController.userConnected })
}

function getUpdatePage (req, res) {
  const id = req.query.id
  if (!id) {
    throw (new Error('id parameter is required'))
  }
  const query = { _id: id }
  const collection = dbconnect.client.db('Projet1').collection('issues')
  dbconnect.findElementInDB(query, collection, 'element find', 'element not find')
    .then(element => {
      res.render('../views/updateIssue.ejs', { issue: element, user: logController.userConnected })
    })
    .catch(e => res.send(e.message))
}

function createIssue (req, res) {
  const issue = new Issue(
    req.body.id,
    req.body.name,
    req.body.description,
    req.body.priority,
    req.body.difficulty
  )

  const collection = dbconnect.client.db('Projet1').collection('issues')
  dbconnect.addElementToDB(issue, collection, 'Issue added successfully.')

  res.redirect('/')
};

function updateIssue (req, res) {
  const issueToUpdate = { _id: req.body.id }

  const updatedIssue = {
    _id: req.body.id,
    _name: req.body.name,
    _description: req.body.description,
    _priority: req.body.priority,
    _difficulty: req.body.difficulty
  }
  console.log(updatedIssue)
  console.log(issueToUpdate)

  const collection = dbconnect.client.db('Projet1').collection('issues')

  dbconnect.updateElementInDB(issueToUpdate, updatedIssue, collection, 'Issue updated')

  res.redirect('/')
};

function deleteIssue (req, res) {
  const issueToDelete = { _id: req.body.id }
  const collection = dbconnect.client.db('Projet1').collection('issues')

  dbconnect.deleteElementFromDB(issueToDelete, collection, 'issue deleted')

  res.redirect('/')
};

module.exports = {
  getBacklogPage,
  getAddPage,
  getUpdatePage,
  createIssue,
  updateIssue,
  deleteIssue
}
