const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const logController = require('../controllers/logController')
const errorRoutes = require('./errorRoutes')

router.get('/projects/:projectID/*', function (req, res, next) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      if (!project._contributors.includes(req.session.user._id)) {
        res.redirect('pageNotFound')
      }
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
  next()
})

router.get('/projects', function (req, res) {
  projectController.getAllProjects(req.session.user._id)
    .then(projects => {
      res.render('../views/projects', {
        projects: projects
      })
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.get('/projects/create', function (req, res) {
  res.render('../views/createProject')
})

router.get('/projects/:projectID', function (req, res) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      logController.getAllUsers()
        .then(users => {
          res.render('../views/project', {
            project: project,
            users: users
          })
        })
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post('/projects/create', function (req, res) {
  projectController.createProject(req, res)
  res.redirect('/projects')
})

router.post('/projects/:projectID', function (req, res) {
  projectController.addContributorToProject(req.params.projectID, req.body.newContributor)
    .then(() => {
      res.redirect('/projects/' + req.params.projectID)
    })
})

router.post('/projects/:projectID/delete', function (req, res) {
  projectController.deleteProject(req.params.projectID)
  res.redirect('/projects')
})

module.exports = router
