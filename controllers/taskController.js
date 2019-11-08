const Task = require('../models/taskModel')
const dbconnect = require('../database/dbconnect')

exports.createTask = function (req, res) {
  const task = new Task(
    req.body.id,
    req.body.description,
    req.body.estimatedTime,
    req.body.dependencies,
    req.body.linkedUserStories,
    req.body.advancementState,
    req.body.assignedDeveloper
  )

  const collection = dbconnect.client.db('Projet1').collection('tasks')
  dbconnect.addElementToDB(task, collection, 'Task added successfully.')
}

exports.getTask = function (req, res) {
  const taskToFind = { _id: req.params.id }
  const collection = dbconnect.client.db('Projet1').collection('tasks')

  return dbconnect.findElementInDB(taskToFind, collection)
    .then(task => {
      return task
    })
}

exports.updateTask = function (req, res) {
  const taskToUpdate = { _id: req.params.id }
  const updatedTask = {
    _id: req.params.id, // for now, id is immutable, so we keep the id from the params
    _description: req.body.description,
    _estimatedTime: req.body.estimatedTime,
    _dependencies: req.body.dependencies,
    _linkedUserStories: req.body.linkedUserStories,
    _advancementState: req.body.advancementState,
    _assignedDeveloper: req.body.assignedDeveloper
  }

  const collection = dbconnect.client.db('Projet1').collection('tasks')

  dbconnect.updateElementInDB(taskToUpdate, updatedTask, collection, 'Task updated')
}

exports.deleteTask = function (req, res) {
  const taskToDelete = { _id: req.params.id }
  const collection = dbconnect.client.db('Projet1').collection('tasks')

  dbconnect.deleteElementFromDB(taskToDelete, collection, 'task deleted')
}

exports.getAllTasks = function (req, res) {
  const collection = dbconnect.client.db('Projet1').collection('tasks')

  return dbconnect.getWholeCollection(collection)
    .then(tasks => {
      return tasks
    })
}

exports.taskExists = function (req, res) {
  dbconnect.elementExists(req, res) ? console.log('id exists') : console.log('id ok')
}
