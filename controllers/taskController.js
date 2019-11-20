const Task = require('../models/taskModel')
const dbconnect = require('../database/dbconnect')

const databaseName = 'Projets'
const collectionName = 'Tasks'

exports.createTask = function (req, res) {
  const task = new Task(
    req.body.id,
    req.params.projectID,
    req.body.description,
    req.body.estimatedTime,
    req.body.dependencies,
    req.body.linkedUserStories,
    req.body.assignedDeveloper
  )
  task._advancementState = 'ref1'
  task._color = 'bg-danger text-white'

  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  dbconnect.addElementToDB(task, collection, 'Task added successfully.')
}

exports.getTask = function (req, res) {
  const taskToFind = { _id: req.params.id }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB(taskToFind, collection)
    .then(task => {
      return task
    })
}

exports.updateTask = function (req, res) {
  const taskToUpdate = { _id: req.params.id }
  const updatedTask = {
    _id: req.params.id, // for now, id is immutable, so we keep the id from the params
    _projectID: req.params.projectID,
    _description: req.body.description,
    _estimatedTime: req.body.estimatedTime,
    _dependencies: req.body.dependencies,
    _linkedUserStories: req.body.linkedUserStories,
    _advancementState: req.body.advancementState,
    _assignedDeveloper: req.body.assignedDeveloper
  }

  if (updatedTask._advancementState === 'ref1') {
    updatedTask._color = 'bg-danger text-white'
  } else if (updatedTask._advancementState === 'ref2') {
    updatedTask._color = 'bg-primary text-white'
  } else {
    updatedTask._color = 'bg-success text-white'
  }

  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  dbconnect.updateElementInDB(taskToUpdate, updatedTask, collection, 'Task updated')
}

exports.deleteTask = function (req, res) {
  const taskToDelete = { _id: req.params.id }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  dbconnect.deleteElementFromDB(taskToDelete, collection, 'task deleted')
}

exports.getAllTasks = function (projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID })
    .then(tasks => {
      return tasks
    })
}

exports.taskExists = function (req, res) {
  dbconnect.elementExists(req, res) ? console.log('id exists') : console.log('id ok')
}
