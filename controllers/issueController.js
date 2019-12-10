const Issue = require('../models/issueModel')
const dbconnect = require('../database/dbconnect')
const taskController = require('../controllers/taskController')
const ObjectID = require('mongodb').ObjectID

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

/* exports.getAllIssuesEnd = function (projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID }).then(issues => {
    const issuesEnd= []

    for (const issue of issues) {
      if (issue._state === 'end') {
        issuesEnd.push(issue)
      }
    }

    return issuesEnd
  }).catch(error => {
    console.log(error)
  })
} */

exports.updateAllIssue = function (issues, tasks, projectID) {
  if (issues == null) {
    issues = this.getAllIssues(projectID)
  }
  if (tasks == null) {
    tasks = taskController.getAllTasks(projectID)
  }
  if ((issues == null || tasks == null) && projectID == null) {
    console.log('Error with updateAllIssue : need at least projectID not null or issues and tasks not null')
  }
  for (const issue of issues) {
    let issueNewState = 'end'
    let issueNewColor = 'alert-success'
    let taskLinked = false
    let oneToDo = false
    let oneEnd = false
    for (const task of tasks) {
      if (task._linkedUserStories.toString().includes(issue._issueID.toString())) {
        taskLinked = true
        if (task._advancementState === 'onGoing' || (oneEnd && task._advancementState === 'toDo') || (oneToDo && task._advancementState === 'end')) {
          issueNewState = 'onGoing'
          issueNewColor = 'alert-warning'
          break
        }
        if (task._advancementState === 'toDo') {
          issueNewState = 'toDo'
          issueNewColor = 'alert-danger'
          oneToDo = true
        }
        if (!oneEnd && task._advancementState === 'end') {
          oneEnd = true
        }
      }
    }
    if (taskLinked) {
      const collection = dbconnect.client.db(databaseName).collection(collectionName)
      const updatedIssue = {
        _issueID: issue._issueID,
        _projectID: issue._projectID,
        _description: issue._description,
        _priority: issue._priority,
        _difficulty: issue._difficulty,
        _state: issueNewState,
        _color: issueNewColor
      }
      dbconnect.updateElementInDB({ _id: ObjectID(issue._id) }, updatedIssue, collection, 'Issue updated')
    } else {
      const collection = dbconnect.client.db(databaseName).collection(collectionName)
      const updatedIssue = {
        _issueID: issue._issueID,
        _projectID: issue._projectID,
        _description: issue._description,
        _priority: issue._priority,
        _difficulty: issue._difficulty,
        _state: 'toDo',
        _color: 'alert-danger'
      }
      dbconnect.updateElementInDB({ _id: ObjectID(issue._id) }, updatedIssue, collection, 'Issue updated')
    }
  }
}

exports.getIssue = function (issueID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB({ _id: ObjectID(issueID) }, collection).then(issue => {
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
          const tasksList = []
          for (const task of tasks) {
            // if(task._linkedUserStories.startsWith(issue._id) || task._linkedUserStories.includes(","+issue._id+",") || task._linkedUserStories.includes(','+issue._id+""))
            if (task._linkedUserStories.includes(issue._issueID)) {
              tasksList.push(task)
            }
          }
          return tasksList
        })
    })
}

exports.createIssue = function (req, res) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.findElementInDB({ _issueID: req.body.issueID, _projectID: req.params.projectID }, collection)
    .then(issue => {
      // if this issueID already exists in this project
      if (issue !== null) {
        return new Promise((resolve, reject) => {
          reject(issue)
        })
      } else {
        const issue = new Issue(
          req.body.issueID,
          req.params.projectID,
          req.body.description,
          req.body.priority,
          req.body.difficulty,
          'toDo'
        )
        issue._color = 'alert-danger'
        return dbconnect.addElementToDB(issue, collection, 'Issue added successfully.').then(result => {
          return result
        }).catch(err => {
          throw err
        })
      }
    })
}

exports.updateIssue = function (req, res) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.findElementInDB({ _id: ObjectID(req.params.id) }, collection)
    .then(issue => {
      if (issue._issueID !== req.body.issueID) {
        return new Promise((resolve, reject) => {
          reject(issue)
        })
      } else {
        const issueToUpdate = { _id: ObjectID(req.params.id) }
        const updatedIssue = {
          _issueID: req.body.issueID,
          _projectID: req.params.projectID,
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

        return dbconnect.updateElementInDB(issueToUpdate, updatedIssue, collection, 'Issue updated').then(result => {
          return result
        }).catch(err => {
          throw err
        })
      }
    })
}

exports.issueIDtoMongoID = function (issueID, projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.findElementInDB({ _issueID: issueID, _projectID: projectID }, collection).then(issue => {
    return issue._id
  }).catch(err => {
    throw err
  })
}

exports.mongoIDtoIssueID = function (id) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.findElementInDB({ _id: ObjectID(id) }, collection).then(issue => {
    return issue._issueID
  }).catch(err => {
    throw err
  })
}

exports.deleteIssue = function (req, res) {
  const issueToDelete = { _id: ObjectID(req.params.id) }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.deleteElementFromDB(issueToDelete, collection, 'Issue deleted').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}

exports.deleteIssueByID = function (issueID) {
  const issueToDelete = { _id: issueID }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.deleteElementFromDB(issueToDelete, collection, 'Issue deleted').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}