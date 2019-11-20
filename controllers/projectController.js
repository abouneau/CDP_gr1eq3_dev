const dbconnect = require('../database/dbconnect')
const ObjectID = require('mongodb').ObjectID
const Project = require('../models/projectModel')

const logController = require('../controllers/logController')

exports.createProject = function (req, res) {
  const collection = dbconnect.client.db('Projets').collection('Projets')
  const project = new Project(req.body.name, req.body.description, req.session.user._id)
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

exports.getAllProjects = function (userID) {
  const collection = dbconnect.client.db('Projets').collection('Projets')
  return dbconnect.getWholeCollection(collection, { _contributors: userID })
    .then(projects => {
      return projects
    })
}

exports.addTaskToProject = function (projectID, taskID) {
  const collection = dbconnect.client.db('Projets').collection('Projets')
  const project = dbconnect.findElementInDB({ _id: ObjectID(projectID) }, collection)
  project._issues.push(taskID)
}

exports.addContributorToProject = function (projectID, newContributor) {
  const collection = dbconnect.client.db('Projets').collection('Projets')
  return this.getProject(projectID)
    .then(project => {
      if (project._contributors.includes(newContributor)) {
        console.log(newContributor + ' is already a contributor in this project.')
      } else {
        return logController.getAllUsers()
          .then(users => {
            if (users.filter(user => user._id === newContributor).length !== 0) {
              project._contributors.push(newContributor)
              return dbconnect.updateElementInDB({ _id: ObjectID(projectID) }, project, collection, 'Contributor added')
            } else {
              console.log('user doesn\'t exist')
            }
          })
      }
    })
}
