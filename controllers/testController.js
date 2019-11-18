const Test = require('../models/testModel')
const dbconnect = require('../database/dbconnect')
const ObjectID = require('mongodb').ObjectID

const databaseName = 'Projets'
const collectionName = 'Tests'

exports.getAllTests = function (projectID) {
  // check if projectID is a valid argument for ObjectID()
  try {
    ObjectID(projectID)
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }

  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID })
    .then(tests => {
      return tests
    })
    .catch(err => {
      throw err
    })
}

exports.getTest = function (testID) {
  // check if testID is a valid argument for ObjectID()
  try {
    ObjectID(testID)
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB({ _id: ObjectID(testID) }, collection)
    .then(test => {
      return test
    })
    .catch(err => {
      throw err
    })
}

exports.createTest = function (req, res) {
  const test = new Test(
    req.params.projectID,
    req.body.name,
    req.body.description
  )
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  dbconnect.addElementToDB(test, collection, 'Test added successfully.')
}

exports.updateTest = function (req, res) {
  const testToUpdate = { _id: ObjectID(req.params.id) }
  const updatedTest = {
    _projectID: req.params.projectID,
    _name: req.body.name,
    _description: req.body.description
  }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  dbconnect.updateElementInDB(testToUpdate, updatedTest, collection, 'Test updated')
}

exports.deleteTest = function (req, res) {
  const testToDelete = { _id: ObjectID(req.params.id) }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  dbconnect.deleteElementFromDB(testToDelete, collection, 'Test deleted')
}
