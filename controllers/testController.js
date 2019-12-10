const Test = require('../models/testModel')
const dbconnect = require('../database/dbconnect')
const ObjectID = require('mongodb').ObjectID

const databaseName = 'Projets'
const collectionName = 'Tests'

/**
 * Return an array containing all the tests of a project
 * @param {String} projectID The project ID of tests returned
 * @returns {Array[Object]} Array containing all the tests of the project
 */
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

/**
 * Return a test
 * @param {String} issueID The ID of the test to return
 * @returns {Object} test of the project with testID asked
 */
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

/**
 * Create a new test given a projectID, name and description
 * @param {object} req - the request containing the projectID, name and description of the test we want to create
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the test will be created if possible, then the created test
 */
exports.createTest = function (req, res) {
  const test = new Test(
    req.params.projectID,
    req.body.name,
    req.body.description
  )
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.addElementToDB(test, collection, 'Test added successfully.')
}

/**
 * Update an existing test given projectID, name and description
 * @param {object} req - the request containing the projectID, name and description of the test we want to update
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the test will be updated if possible, then the updated test
 */
exports.updateTest = function (req, res) {
  const testToUpdate = { _id: ObjectID(req.params.id) }
  const updatedTest = {
    _projectID: req.params.projectID,
    _name: req.body.name,
    _description: req.body.description
  }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.updateElementInDB(testToUpdate, updatedTest, collection, 'Test updated')
}

/**
 * Delete an existing test given an testID
 * @param {object} req - the request containing the ID of the test we want to delete
 * @param {object} res - the response where the new app state will be stored
 */
exports.deleteTest = function (req, res) {
  const testToDelete = { _id: ObjectID(req.params.id) }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  dbconnect.deleteElementFromDB(testToDelete, collection, 'Test deleted')
}
