const Task = require('../models/taskModel')
const dbconnect = require('../database/dbconnect')
const ObjectID = require('mongodb').ObjectID

const databaseName = 'Projets'
const collectionName = 'Tasks'
const issueCollectionName = 'Issues'

exports.createTask = function (req, res) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  dbconnect.findElementInDB({ _taskID: req.body.taskID, _projectID: req.params.projectID }, collection)
    .then(task => {
      if (task !== null) {
        return new Promise((resolve, reject) => {
          reject(task)
        })
      } else {
        const task = new Task(
          req.body.taskID,
          req.params.projectID,
          req.body.description,
          req.body.estimatedTime,
          req.body.dependencies,
          'toDo',
          req.body.assignedDeveloper
        )
        if (req.body.linkedUserStories !== '') {
          const userStoriesToLink = req.body.linkedUserStories.split(',')
          for (const issueID of userStoriesToLink) {
            task.addLinkedUserStory(issueID)
          }
        }
        task._color = 'alert-danger'
        dbconnect.addElementToDB(task, collection, 'Task added successfully.')
      }
    })
}

exports.getTask = function (req, res) {
  const taskToFind = { _id: ObjectID(req.params.id) }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB(taskToFind, collection)
    .then(task => {
      return task
    })
}

exports.linkToIssue = function (req, res) {
  const issueToLinkWith = req.params.id
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  const taskToLinkId = { _taskID: req.body.taskToLink, _projectID: req.params.projectID }
  dbconnect.findElementInDB(taskToLinkId, collection)
    .then(taskToLink => {
      if (!taskToLink._linkedUserStories.includes(issueToLinkWith)) {
        taskToLink._linkedUserStories.push(issueToLinkWith)
        dbconnect.updateElementInDB(taskToLinkId, taskToLink, collection, 'TaskLinked')
      }
    })
}

exports.updateTask = function (req, res) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  dbconnect.findElementInDB({ _id: ObjectID(req.params.id) }, collection)
    .then(task => {
      if (task._taskID !== req.body.taskID) {
        return new Promise((resolve, reject) => {
          reject(task)
        })
      } else {
        const taskToUpdate = { _id: ObjectID(req.params.id) }
        const issuesToLinkWith = []
        if (req.body.linkedUserStories !== '') {
          const userStoriesToLink = req.body.linkedUserStories.split(',')
          for (const us of userStoriesToLink) {
            issuesToLinkWith.push(us)
          }
        }
        const updatedTask = {
          _taskID: req.body.taskID,
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
        dbconnect.updateElementInDB(taskToUpdate, updatedTask, collection, 'Task updated')
      }
    })
}

exports.deleteTask = function (req, res) {
  const taskToDelete = { _id: ObjectID(req.params.id) }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  dbconnect.deleteElementFromDB(taskToDelete, collection, 'task deleted')
}

exports.deleteTaskByID = function (taskID) {
  const taskToDelete = { _id: ObjectID(taskID) }
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

exports.updateAllTask = function (tasks, projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  const collection1 = dbconnect.client.db(databaseName).collection(issueCollectionName)

  if (tasks == null && projectID == null) {
    console.log('Error with updateAllTask : need at least projectID not null or tasks not null')
  } else {
    if (tasks == null) {
      tasks = this.getAllTasks(projectID)
    }

    for (const task of tasks) {
      const newLinkedUserStories = []
      let allIssuesExist = true
      let wait = 0
      for (const issueId of task._linkedUserStories) {
        const id = { _issueID: issueId }
        dbconnect.elementExists(id, collection1)
          .then(issueExist => {
            if (issueExist) {
              newLinkedUserStories.push(issueId)
              ++wait
            } else {
              allIssuesExist = false
              ++wait
            }
            if (wait >= task._linkedUserStories.length && !allIssuesExist) {
              const updatedTask = {
                _taskID: task._taskID,
                _projectID: task._projectID,
                _description: task._description,
                _estimatedTime: task._estimatedTime,
                _dependencies: task._dependencies,
                _linkedUserStories: newLinkedUserStories,
                _advancementState: task._advancementState,
                _assignedDeveloper: task._assignedDeveloper,
                _color: task._color
              }
              const taskToUpdate = { _id: ObjectID(task._id) }
              dbconnect.updateElementInDB(taskToUpdate, updatedTask, collection, 'Task updated')
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}

exports.taskExists = function (req, res) {
  dbconnect.elementExists(req, res) ? console.log('id exists') : console.log('id ok')
}
