const express = require('express')
const router = express.Router()

const issueController = require('../controllers/issueController')
const projectController = require('../controllers/projectController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

router.get(baseURL + '/issues', function (req, res) {
  issueController.getAllIssues(req.params.projectID)
    .then(issues => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/backlog', {
            issues: issues,
            project: project
          })
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

router.post(baseURL + '/issues/create', function (req, res) {
  issueController.createIssue(req, res)
  res.redirect('/projects/' + req.params.projectID + '/issues')
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
          console.log(project._name)
          res.render('../views/updateIssue', {
            issue: issue,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/issues/:id/update', function (req, res) {
  issueController.updateIssue(req, res)
  res.redirect('/projects/' + req.params.projectID + '/issues')
})

router.post(baseURL + '/issues/:id/delete', function (req, res) {
  issueController.deleteIssue(req, res)
  res.redirect('/projects/' + req.params.projectID + '/issues')
})

module.exports = router
