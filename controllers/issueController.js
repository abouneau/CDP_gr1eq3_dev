const Issue = require('../models/issueModel')
const dbconnect = require('../database/dbconnect')
const taskController = require('../controllers/taskController')

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

exports.updateAllIssue = function (issues, tasks, projectID) {
  if (issues == null) {
    issues = this.getAllIssues(projectID)
  }
  if (tasks == null) {
    tasks = taskController.getAllTasks(projectID)
  }
  if((issues == null || tasks == null) && projectID == null) {
    console.log("Error with updateAllIssue : need at least projectID not null or issues and tasks not null")
  }
  for (let issue of issues) {
    let issueNewState = 'end'
    let issueNewColor = 'alert-success'
    let taskLinked = false
    for (let task of tasks) {
      if (task._linkedUserStories.includes(issue._id)) {
        taskLinked = true
        if (task._advancementState === 'toDo') {
          issueNewState = 'toDo'
          issueNewColor = 'alert-danger'
        }
        if (task._advancementState === 'onGoing') {
          issueNewState = 'onGoing'
          issueNewColor = 'alert-warning'
          break
        }
      }
    }
    if (taskLinked) {
      issue._state = issueNewState
      issue._color = issueNewColor
    }
  }
}

exports.getIssue = function (issueID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB({ _id: issueID }, collection).then(issue => {
    return issue
  }).catch(err => {
    throw err
  })
}

exports.getTaskLinked = function (issueID) {
  return this.getIssue(issueID)
    .then(issue => {
      return taskController.getAllTasks(issue._projectID)
        .then(tasks => {
          let tasksList = []
          for (let task of tasks) {
            // if(task._linkedUserStories.startsWith(issue._id) || task._linkedUserStories.includes(","+issue._id+",") || task._linkedUserStories.includes(','+issue._id+""))
            if (task._linkedUserStories.includes(issue._id)) {
              tasksList.push(task)
            }
          }
          return tasksList
        })
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
