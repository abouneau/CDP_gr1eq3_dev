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
    'toDo',
    req.body.assignedDeveloper
  )
  if (req.body.linkedUserStories !== '') {
    const userStoriesToLink = req.body.linkedUserStories.split(',')
    for (let us of userStoriesToLink) {
      task.addLinkedUserStory(us)
    }
  }
  task._color = 'alert-danger'

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

exports.linkToIssue = function (req, res) {
  const issueToLinkWith = req.params.id
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  const taskToLinkId = { _id: req.body.taskList }
  dbconnect.findElementInDB(taskToLinkId, collection)
    .then(taskToLink => {
      console.log('test')
      if (!taskToLink._linkedUserStories.includes(issueToLinkWith)) {
        console.log('TEST')
        console.log(issueToLinkWith)
        taskToLink._linkedUserStories.push(issueToLinkWith)
        dbconnect.updateElementInDB(taskToLinkId, taskToLink, collection, 'TaskLinked')
      }
    })
}

exports.updateTask = function (req, res) {
  const taskToUpdate = { _id: req.params.id }
  const issuesToLinkWith = []
  if (req.body.linkedUserStories !== '') {
    const userStoriesToLink = req.body.linkedUserStories.split(',')
    for (let us of userStoriesToLink) {
      issuesToLinkWith.push(us)
    }
  }
  const updatedTask = {
    _id: req.params.id, // for now, id is immutable, so we keep the id from the params
    _projectID: req.params.projectID,
    _description: req.body.description,
    _estimatedTime: req.body.estimatedTime,
    _dependencies: req.body.dependencies,
    _linkedUserStories: issuesToLinkWith,
    _advancementState: req.body.advancementState,
    _assignedDeveloper: req.body.assignedDeveloper
  }

  if (updatedTask._advancementState === 'toDo') {
    updatedTask._color = 'alert-danger'
  } else if (updatedTask._advancementState === 'onGoing') {
    updatedTask._color = 'alert-warning'
  } else {
    updatedTask._color = 'alert-success'
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
