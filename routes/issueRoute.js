const express = require('express')
const router = express.Router()

const issueController = require('../controllers/issueController')
const projectController = require('../controllers/projectController')
const taskController = require('../controllers/taskController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

// if the issue id doesn't belong to project with id projectID, redirect to pageNotFound
router.get(baseURL + '/issues/:id/*', function (req, res, next) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      issueController.getIssue(req.params.id)
        .then(issue => {
          if (JSON.stringify(project._id) !== JSON.stringify(issue._projectID)) {
            res.redirect('pageNotFound')
          }
        })
      next()
    })
})

router.get(baseURL + '/issues', function (req, res) {
  issueController.getAllIssues(req.params.projectID)
    .then(issues => {
      taskController.getAllTasks(req.params.projectID)
        .then(tasks => {
          issueController.updateAllIssue(issues, tasks)
          projectController.getProject(req.params.projectID)
            .then(project => {
              res.render('../views/backlog', {
                issues: issues,
                tasks: tasks,
                project: project
              })
            })
            .catch(err => errorRoutes.pageNotFound(res, err))
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.get(baseURL + '/issues/create', function (req, res) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      res.render('../views/createIssue', {
        project: project
      })
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

// router.get(baseURL + '/issues/:id', function (req, res) {
//   issueController.getIssue(req.params.id)
//     .then(issue => {
//       console.log(issue._name)
//     })
//     .catch(err => errorRoutes.pageNotFound(res, err))
// })

router.get(baseURL + '/issues/:id/update', function (req, res) {
  issueController.getIssue(req.params.id)
    .then(issue => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/updateIssue', {
            issue: issue,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/issues/create', function (req, res) {
  issueController.createIssue(req, res)
    .then(result => {
      res.redirect('/projects/' + req.params.projectID + '/issues')
    })
    .catch(issue => console.log('The issue id already exists : ' + issue._issueID))
})

router.post(baseURL + '/issues/:id/update', function (req, res) {
  issueController.updateIssue(req, res)
    .then(result => {
      res.redirect('/projects/' + req.params.projectID + '/issues')
    })
    .catch(issue => console.log('The issue id cannot change. It must stay ' + issue._issueID))
})

router.post(baseURL + '/issues/:id/delete', function (req, res) {
  issueController.deleteIssue(req, res)
  res.redirect('/projects/' + req.params.projectID + '/issues')
})

module.exports = router
