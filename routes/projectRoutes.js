const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const logController = require('../controllers/logController')

router.get('/', function (req, res) {
  res.redirect('/projects')
})

router.get('/projects', function (req, res) {
  projectController.getAllProjects()
    .then(projects => {
      res.render('../views/projects', {
        projects: projects,
        user: logController.userConnected
      })
    })
})

router.get('/projects/create', function (req, res) {
  res.render('../views/createProject')
})

router.get('/projects/:projectID', function (req, res) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      res.render('../views/project', {
        project: project,
        user: logController.userConnected
      })
    })
})

router.post('/projects/create', function (req, res) {
  projectController.createProject(req, res)
  res.redirect('/projects')
})

module.exports = router
