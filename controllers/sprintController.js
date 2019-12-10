const Sprint = require('../models/sprintModel')
const dbconnect = require('../database/dbconnect')
const issueController = require('./issueController')
const ObjectID = require('mongodb').ObjectID

const databaseName = 'Projets'
const collectionName = 'Sprints'
const issueCollectionName = 'Issues'

const dateBeforeOrIsToday = function (dateToCompare) {
  const date = new Date()
  if ((dateToCompare[0] < date.getFullYear()) ||
    (dateToCompare[0] === date.getFullYear() && dateToCompare[1] < (date.getMonth() + 1)) ||
    (dateToCompare[0] === date.getFullYear() && dateToCompare[1] === (date.getMonth() + 1) && dateToCompare[2] <= date.getDate())) {
    return true
  }
  return false
}

exports.getAllSprints = function (projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID }).then(sprints => {
    return sprints
  }).catch(error => {
    console.log(error)
  })
}

exports.updateAllSprintLinkedIssue = function (sprints, projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  const collection1 = dbconnect.client.db(databaseName).collection(issueCollectionName)

  if (sprints == null && projectID == null) {
    console.log('Error with updateAllSprintLinkedIssue : need at least projectID not null or sprints not null')
  } else {
    if (sprints == null) {
      sprints = this.getAllSprints(projectID)
    }

    for (const sprint of sprints) {
      const newLinkedUserStories = []
      let allIssuesExist = true
      let wait = 0
      for (const issueId of sprint._linkedUserStories) {
        dbconnect.elementExists({ _issueID: issueId }, collection1)
          .then(issueExist => {
            if (issueExist) {
              newLinkedUserStories.push(issueId)
              ++wait
            } else {
              allIssuesExist = false
              ++wait
            }
            if (wait >= sprint._linkedUserStories.length && !allIssuesExist) {
              const updatedSprint = {
                _projectID: sprint._projectID,
                _name: sprint._name,
                _beginDate: sprint._beginDate,
                _endDate: sprint.endDate,
                _linkedUserStories: newLinkedUserStories,
                _totalDifficulty: sprint._totalDifficulty,
                _state: sprint._state,
                _color: sprint._color
              }
              const sprintToUpdate = { _id: ObjectID(sprint._id) }
              dbconnect.updateElementInDB(sprintToUpdate, updatedSprint, collection, 'Sprint updated')
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}

exports.updateAllSprintState = function (sprints, projectID) {
  if (sprints == null) {
    sprints = this.getAllSprints(projectID)
  }
  if (sprints == null && projectID == null) {
    console.log('Error with updateAllSprintState : need at least projectID not null or sprints not null')
  }

  for (const sprint of sprints) {
    let valueString = sprint._beginDate.split('-')
    const valueBegin = []
    let count = 0
    for (const s of valueString) {
      valueBegin[count] = parseInt(s, 10)
      ++count
    }

    valueString = sprint._endDate.split('-')
    const valueEnd = []
    count = 0
    for (const s of valueString) {
      valueEnd[count] = parseInt(s, 10)
      ++count
    }

    if (dateBeforeOrIsToday(valueEnd)) {
      sprint._state = 'end'
      sprint._color = 'alert-success'
    } else if (dateBeforeOrIsToday(valueBegin)) {
      sprint._state = 'onGoing'
      sprint._color = 'alert-warning'
    } else {
      sprint._state = 'toDo'
      sprint._color = 'alert-danger'
    }
  }
}

exports.getSprint = function (sprintID) {
  try {
    ObjectID(sprintID)
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }

  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB({ _id: ObjectID(sprintID) }, collection).then(sprint => {
    return sprint
  }).catch(err => {
    throw err
  })
}

exports.getIssueListOfSprint = function (sprintID) {
  return this.getSprint(sprintID).then(sprint => {
    return issueController.getAllIssues(sprint._projectID).then(issues => {
      const issuesList = []
      for (const issue of issues) {
        if (sprint._linkedUserStories.includes(issue._issueID)) {
          issuesList.push(issue)
        }
      }
      return issuesList
    })
  })
}

exports.createSprint = function (req, res) {
  const sprint = new Sprint(
    req.params.projectID,
    req.body.name,
    req.body.beginDate,
    req.body.endDate
  )

  sprint._totalDifficulty = 0

  if (req.body.linkedUserStories !== '') {
    const userStoriesToLink = req.body.linkedUserStories.split(',')
    for (const issueID of userStoriesToLink) {
      sprint.addLinkedUserStory(issueID)
      issueController.issueIDtoMongoID(issueID, req.params.projectID)
        .then(id => {
          issueController.getIssue(id)
            .then(issue => {
              sprint._totalDifficulty += issue._difficulty
            })
        })
    }
  }

  const valueString = req.body.beginDate.split('-')
  const value = []
  let count = 0
  for (const s of valueString) {
    value[count] = parseInt(s, 10)
    ++count
  }

  if (dateBeforeOrIsToday(value)) {
    sprint._state = 'onGoing'
    sprint._color = 'alert-warning'
  } else {
    sprint._state = 'toDo'
    sprint._color = 'alert-danger'
  }

  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  dbconnect.addElementToDB(sprint, collection, 'Sprint added successfully.')
}

exports.linkToIssue = function (req, res) {
  const issueToLinkWith = req.body.issueList
  const collection = dbconnect.client.db(databaseName).collection(collectionName)
  const sprintToLinkId = { _id: ObjectID(req.params.id) }
  return dbconnect.findElementInDB(sprintToLinkId, collection)
    .then(sprintToLink => {
      if (!sprintToLink._linkedUserStories.includes(issueToLinkWith)) {
        sprintToLink._linkedUserStories.push(issueToLinkWith)
        return dbconnect.updateElementInDB(sprintToLinkId, sprintToLink, collection, 'Sprint Linked')
      }
    })
}

exports.updateSprint = function (req, res) {
  const issueCollection = dbconnect.client.db(databaseName).collection(issueCollectionName)
  const sprintCollection = dbconnect.client.db(databaseName).collection(collectionName)
  return dbconnect.findElementInDB({ _issueID: req.body.issueList, _projectID: req.params.projectID }, issueCollection)
    .then(issue => {
      const sprintToUpdate = { _id: ObjectID(req.params.id) }
      return dbconnect.findElementInDB(sprintToUpdate, sprintCollection)
        .then(sprint => {
          if (!sprint._linkedUserStories.includes(issue._issueID)) {
            const newTotalDifficulty = (parseInt(sprint._totalDifficulty) + parseInt(issue._difficulty))
            const newLinkedUserStories = sprint._linkedUserStories
            newLinkedUserStories.push(req.body.issueList)
            const updatedSprint = {
              _projectID: sprint._projectID,
              _name: sprint._name,
              _beginDate: sprint._beginDate,
              _endDate: sprint._endDate,
              _linkedUserStories: newLinkedUserStories,
              _totalDifficulty: newTotalDifficulty
            }

            return dbconnect.updateElementInDB(sprintToUpdate, updatedSprint, sprintCollection, 'Sprint updated')
              .then(result => {
                return result
              }).catch(err => {
                throw err
              })
          }
        })
    })
}

exports.deleteSprint = function (req, res) {
  const sprintToDelete = { _id: ObjectID(req.params.id) }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.deleteElementFromDB(sprintToDelete, collection, 'Sprint deleted').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}
