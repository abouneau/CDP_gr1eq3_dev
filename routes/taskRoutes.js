const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const projectController = require('../controllers/projectController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

router.get(baseURL + '/tasks', function (req, res) {
  taskController.getAllTasks(req.params.projectID)
    .then(tasks => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/tasks', {
            tasks: tasks,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.get(baseURL + '/tasks/create', function (req, res) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      res.render('../views/createTask', {
        project: project
      })
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/tasks/create', function (req, res) {
  taskController.createTask(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tasks')
})

// router.get(baseURL + '/tasks/:id', taskController.getTask)

router.get(baseURL + '/tasks/:id/update', function (req, res) {
  taskController.getTask(req, res)
    .then(task => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/updateTask', {
            task: task,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/tasks/:id/update', function (req, res) {
  taskController.updateTask(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tasks')
})

router.post(baseURL + '/tasks/:id/delete', function (req, res) {
  taskController.deleteTask(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tasks')
})

module.exports = router
