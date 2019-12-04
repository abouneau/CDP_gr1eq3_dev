const express = require('express')
const router = express.Router()

const sprintController = require('../controllers/sprintController')
const projectController = require('../controllers/projectController')
const issueController = require('../controllers/issueController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

router.get(baseURL + '/sprints', function (req, res) {
  sprintController.getAllSprints(req.params.projectID)
    .then(sprints => {
      issueController.getAllIssues(req.params.projectID)
        .then(issues => {
          sprintController.updateAllSprintLinkedIssue(sprints, req.params.projectID)
          sprintController.updateAllSprintState(sprints, req.params.projectID)
          projectController.getProject(req.params.projectID)
            .then(project => {
              res.render('../views/sprintAll', {
                sprints: sprints,
                issues: issues,
                project: project
              })
            })
            .catch(err => errorRoutes.pageNotFound(res, err))
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

/* router.get(baseURL + '/sprints/:id', function (req, res) {

}) */

router.get(baseURL + '/sprints/create', function (req, res) {
  issueController.getAllIssues(req.params.projectID)
    .then(issues => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/createSprint', {
            issues: issues,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.get(baseURL + '/sprints/:id/update', function (req, res) {
  sprintController.getSprint(req.params.id)
    .then(sprint => {
      issueController.getAllIssues(req.params.projectID)
        .then(issues => {
          projectController.getProject(req.params.projectID)
            .then(project => {
              console.log(project._name)
              res.render('../views/updateSprint', {
                sprint: sprint,
                issues: issues,
                project: project
              })
            })
            .catch(err => errorRoutes.pageNotFound(res, err))
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/sprints/create', function (req, res) {
  sprintController.createSprint(req, res)
  res.redirect('/projects/' + req.params.projectID + '/sprints')
})

router.post(baseURL + '/sprints/:id/linkIssue', function (req, res) {
  sprintController.linkToIssue(req, res)
  res.redirect('/projects/' + req.params.projectID + '/sprints')
})

router.post(baseURL + '/sprints/:id/update', function (req, res) {
  sprintController.updateSprint(req, res)
  res.redirect('/projects/' + req.params.projectID + '/sprints')
})

router.post(baseURL + '/sprints/:id/delete', function (req, res) {
  sprintController.deleteSprint(req, res)
  res.redirect('/projects/' + req.params.projectID + '/sprints')
})

module.exports = router
