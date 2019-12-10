const Release = require('../models/releaseModel')
const dbconnect = require('../database/dbconnect')
const ObjectID = require('mongodb').ObjectID
const issueController = require('./issueController')
const taskController = require('./taskController')

const databaseName = 'Projets'
const collectionName = 'Releases'
const releasedIssueCollectionName = 'ReleasedIssues'

/**
 * Return an array containing all the releases of a project
 * @param {String} projectID The project ID of releases returned
 * @returns {Array[Object]} Array containing all the releases of the project
 */
exports.getAllReleases = function (projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID }).then(releases => {
    return releases
  }).catch(error => {
    console.log(error)
  })
}

/**
 * Return an release
 * @param {String} releaseID The ID of the release to return
 * @returns {Object} release of the project with releaseID asked
 */
exports.getRelease = function (releaseID) {
  try {
    ObjectID(releaseID)
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err)
    })
  }

  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.findElementInDB({ _id: ObjectID(releaseID) }, collection).then(release => {
    return release
  }).catch(err => {
    throw err
  })
}

/**
 * Return an array of the issues contain in this release
 * @param {String} releaseID the ID of the release to return an array of issues contain in
 * @returns {Array[Object]} Array of the issues contain in this release
 */
exports.getIssueListOfRelease = function (releaseID) {
  return this.getRelease(releaseID).then(release => {
    const collection = dbconnect.client.db(databaseName).collection(releasedIssueCollectionName)
    return dbconnect.getWholeCollection(collection, { _projectID: release._projectID }).then(issues => {
      const issuesList = []
      for (const issue of issues) {
        if (release._releasedUserStories.includes(issue._id.toString())) {
          issuesList.push(issue)
        }
      }
      return issuesList
    }).catch(error => {
      console.log(error)
    })
  })
}

/**
 * Add an issue to the released issues
 * @param {Object} issue the issue to add to the released issues
 */
exports.addToReleasedIssue = function (issue) {
  const collection = dbconnect.client.db(databaseName).collection(releasedIssueCollectionName)

  return dbconnect.addElementToDB(issue, collection, 'Released issue added successfully.').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}

/**
 * Erase all the task linked only to issues contained in this released or precedent released
 * @param {Array[Object]} issues the issues released
 * @param {Array{Object}} tasks all the tasks of the project
 */
exports.updateTask = function (issues, tasks) {
  for (const task of tasks) {
    if (!(task._linkedUserStories.length > issues.length || task._linkedUserStories.length === 0)) {
      let issueLinkedCount = 0
      for (const issue of issues) {
        if (task._linkedUserStories.includes(issue._issueID)) {
          ++issueLinkedCount
        }
      }
      if (issueLinkedCount === task._linkedUserStories.length) {
        taskController.deleteTaskByID(task._id)
      }
    }
  }
}

/**
 * Create a new release given an projectID, version and description
 * If the version is already in use for a release, then an error is display on the console,
 * and the release will not be created.
 * @param {object} req - the request containing the projectID, version and description of the release we want to create
 * @param {object} res - the response where the new app state will be stored
 * @return {promise} The promise that the release will be created if possible, then the created release
 */
exports.createRelease = function (req, res) {
  const date = new Date()
  let versionDuplicated = false

  const release = new Release(
    req.params.projectID,
    req.body.version,
    req.body.description,
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  )

  let difficultyAchieved = 0

  this.getAllReleases(req.params.projectID)
    .then(releases => {
      const issueAlreadyReleased = []
      for (const rel of releases) {
        if (versionDuplicated || rel._version === req.body.version) {
          versionDuplicated = true
          break
        }
        for (const issue of rel._releasedUserStories) {
          issueAlreadyReleased.push(issue)
        }
      }
      if (versionDuplicated) {
        console.log('Can\'t duplicate version of release')
      } else {
        issueController.getAllIssues(req.params.projectID)
          .then(issues => {
            const issueReleased = []
            for (const issue of issues) {
              if (issue._state === 'end' && !issueAlreadyReleased.includes(issue._id.toString())) {
                release.addReleasedUserStory(issue._id.toString())
                this.addToReleasedIssue(issue)
                issueReleased.push(issue)
                difficultyAchieved += parseInt(issue._difficulty, 10)
                issueController.deleteIssueByID(issue._id)
              }
            }
            taskController.getAllTasks(req.params.projectID)
              .then(tasks => {
                this.updateTask(issueReleased, tasks)
                release._difficultyAchieved = difficultyAchieved
                const collection = dbconnect.client.db(databaseName).collection(collectionName)
                dbconnect.addElementToDB(release, collection, 'Release added successfully.')
              }).catch(error => {
                console.log(error)
              })
          }).catch(error => {
            console.log(error)
          })
      }
    }).catch(error => {
      console.log(error)
    })
}
