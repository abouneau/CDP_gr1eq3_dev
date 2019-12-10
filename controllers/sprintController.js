const Sprint = require('../models/sprintModel')
const dbconnect = require('../database/dbconnect')
const issueController = require('./issueController')
const ObjectID = require('mongodb').ObjectID

const databaseName = 'Projets'
const collectionName = 'Sprints'
const issueCollectionName = 'Issues'

/**
 * Return a boolean that are at true if the date given in parameter is previous to today
 * @param {Array[Int]} dateToCompare The date we want to know if it's previous to today
 * @returns {Boolean} A boolean indicating if dateToCompare is previous to today
 */
const dateBeforeOrIsToday = function (dateToCompare) {
  const date = new Date()
  if ((dateToCompare[0] < date.getFullYear()) ||
    (dateToCompare[0] === date.getFullYear() && dateToCompare[1] < (date.getMonth() + 1)) ||
    (dateToCompare[0] === date.getFullYear() && dateToCompare[1] === (date.getMonth() + 1) && dateToCompare[2] <= date.getDate())) {
    return true
  }
  return false
}

/**
 * Return an array containing all the sprints of a project
 * @param {String} projectID The project ID of sprints returned
 * @returns {Array[Object]} Array containing all the sprints of the project
 */
exports.getAllSprints = function (projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID }).then(sprints => {
    return sprints
  }).catch(error => {
    console.log(error)
  })
}

/**
 * Update all sprint linkedUserStories of a project based on the existing issues
 * @param {Array[Object]} sprints The sprints to update
 * @param {ObjectID} projectID In case there are no parameter sprints given, it allows to recover sprints
 */
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

/**
 * Update all sprints state of a project based on beginDate and endDate of the sprints (today before beginDate: toDo) (today between beginDate and endDate or equal to one of them: onGoing) (today after endDate: end)
 * @param {Array[Object]} issues The sprints to update
 * @param {ObjectID} projectID In case there are no parameter sprints given, it allows to recover sprints
 */
exports.updateAllSprintState = function (sprints, projectID) {
  if (sprints == null) {
    sprints = this.getAllSprints(projectID)
  }
  if (sprints == null && projectID == null) {
    console.log('Error with updateAllSprintState : need at least projectID not null or sprints not null')
  }

  for (const sprint of sprints) {
    if (sprint._beginDate !== null && sprint._endDate !== null) {
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
}

/**
 * Return an sprint
 * @param {String} sprintID The ID of the sprint to return
 * @returns {Object} sprint of the project with sprintID asked
 */
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

/**
 * Return an array of the issues linked to this sprint
 * @param {String} sprintID the ID of the sprint to return an array of issues linked to
 * @returns {Array[Object]} Array of the issues linked to the sprint
 */
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

/**
 * Create a new sprint given an projectID, name, begiinDate and endDate
 * @param {object} req - the request containing the projectID, name, begiinDate and endDate of the sprint we want to create
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the sprint will be created if possible, then the created sprint
 */
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

/**
 * Link a sprint to an issue by add the issueID of the issue to the linkedUserStories of the sprint
 * @param {object} req - the request containing the sprintID, projectID of the sprint we want to link and the issueID of the issue we want to link the sprint to
 * @param {object} res - the response where the new app state will be stored
 */
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

/**
 * Update an existing sprint given an projectID, name, begiinDate and endDate
 * @param {object} req - the request containing the projectID, name, begiinDate and endDate of the sprint we want to update
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the sprint will be updated if possible, then the updated sprint
 */
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

/**
 * Delete an existing sprint given an taskID
 * @param {object} req - the request containing the ID of the sprint we want to delete
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the sprint will be delete if possible, then the confirmation for the deletion of the sprint
 */
exports.deleteSprint = function (req, res) {
  const sprintToDelete = { _id: ObjectID(req.params.id) }
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.deleteElementFromDB(sprintToDelete, collection, 'Sprint deleted').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}
