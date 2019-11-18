const dbconnect = require('../database/dbconnect')
const ObjectID = require('mongodb').ObjectID
const Project = require('../models/projectModel')

exports.createProject = function (req, res) {
  const collection = dbconnect.client.db('Projets').collection('Projets')
  const project = new Project(req.body.name, req.body.description, 'user1')
  dbconnect.addElementToDB(project, collection)
}

exports.getProject = function (projectID) {
  // check if projectID is a valid argument for ObjectID()
  try {
    ObjectID(projectID)
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }

  const collection = dbconnect.client.db('Projets').collection('Projets')
  return dbconnect.findElementInDB({ _id: ObjectID(projectID) }, collection)
    .then(project => {
      return project
    })
    .catch(err => {
      throw err
    })
}

exports.getAllProjects = function () {
  const collection = dbconnect.client.db('Projets').collection('Projets')
  return dbconnect.getWholeCollection(collection)
    .then(projects => {
      return projects
    })
}

exports.addTaskToProject = function (projectID, taskID) {
  const collection = dbconnect.client.db('Projets').collection('Projets')
  const project = dbconnect.findElementInDB({ _id: ObjectID(projectID) }, collection)
  project._issues.push(taskID)
}
