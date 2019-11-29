const Issue = require('../models/issueModel')
const dbconnect = require('../database/dbconnect')

const databaseName = 'Projets'
const collectionName = 'Issues'

exports.getAllIssues = function (projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID }).then(issues => {
    return issues
  }).catch(error => {
    console.log(error)
  })
}

exports.getIssue = function (issueID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB({ _id: issueID }, collection).then(issue => {
    return issue
  }).catch(err => {
    throw err
  })
}

exports.createIssue = function (req, res) {
  const issue = new Issue(
    req.body.id,
    req.params.projectID,
    req.body.name,
    req.body.description,
    req.body.priority,
    req.body.difficulty,
    'toDo'
  )
  issue._color = 'alert-danger'
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.addElementToDB(issue, collection, 'Issue added successfully.').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}

exports.updateIssue = function (req, res) {
  const issueToUpdate = { _id: req.params.id }
  const updatedIssue = {
    _id: req.params.id,
    _projectID: req.params.projectID,
    _name: req.body.name,
    _description: req.body.description,
    _priority: req.body.priority,
    _difficulty: req.body.difficulty,
    _state: req.body.state
  }

  if (updatedIssue._state === 'toDo') {
    updatedIssue._color = 'alert-danger'
  } else if (updatedIssue._state === 'onGoing') {
    updatedIssue._color = 'alert-warning'
  } else {
    updatedIssue._color = 'alert-success'
  }

  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.updateElementInDB(issueToUpdate, updatedIssue, collection, 'Issue updated').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}

exports.deleteIssue = function (req, res) {
  const issueToDelete = { _id: req.params.id }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.deleteElementFromDB(issueToDelete, collection, 'Issue deleted').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}
