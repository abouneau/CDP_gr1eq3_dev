const Release = require('../models/releaseModel')
const dbconnect = require('../database/dbconnect')
const ObjectID = require('mongodb').ObjectID
const issueController = require('./issueController')
const taskController = require('./taskController')

const databaseName = 'Projets'
const collectionName = 'Releases'
const releasedIssueCollectionName = 'ReleasedIssues'

exports.getAllReleases = function (projectID) {
  const collection = dbconnect.client.db(databaseName).collection(collectionName)

  return dbconnect.getWholeCollection(collection, { _projectID: projectID }).then(releases => {
    return releases
  }).catch(error => {
    console.log(error)
  })
}

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

exports.addToReleasedIssue = function (issue) {
  const collection = dbconnect.client.db(databaseName).collection(releasedIssueCollectionName)

  return dbconnect.addElementToDB(issue, collection, 'Released issue added successfully.').then(result => {
    return result
  }).catch(err => {
    throw err
  })
}

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
