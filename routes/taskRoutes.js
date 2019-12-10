const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const issueController = require('../controllers/issueController')
const projectController = require('../controllers/projectController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

// if the task id doesn't belong to project with id projectID, redirect to pageNotFound
router.get(baseURL + '/tasks/:id/*', function (req, res, next) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      taskController.getTask(req, res)
        .then(task => {
          if (JSON.stringify(project._id) !== JSON.stringify(task._projectID)) {
            res.redirect('pageNotFound')
          }
        })
      next()
    })
})

router.get(baseURL + '/tasks', function (req, res) {
  taskController.getAllTasks(req.params.projectID).then(tasks => {
    taskController.updateAllTask(tasks)
    issueController.getAllIssues(req.params.projectID).then(issues => {
      projectController.getProject(req.params.projectID).then(project => {
        res.render('../views/tasks', {
          tasks: tasks,
          issues: issues,
          project: project
        })
      }).catch(err => errorRoutes.pageNotFound(res, err))
    }).catch(err => errorRoutes.pageNotFound(res, err))
  }).catch(err => errorRoutes.pageNotFound(res, err))
})

router.get(baseURL + '/tasks/create', function (req, res) {
  issueController.getAllIssues(req.params.projectID)
    .then(issues => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/createTask', {
            issues: issues,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/tasks/create', function (req, res) {
  taskController.createTask(req, res)
    .then(result => { res.redirect('/projects/' + req.params.projectID + '/tasks') })
})

// router.get(baseURL + '/tasks/:id', taskController.getTask)

router.get(baseURL + '/tasks/:id/update', function (req, res) {
  taskController.getTask(req, res)
    .then(task => {
      issueController.getAllIssues(req.params.projectID)
        .then(issues => {
          projectController.getProject(req.params.projectID)
            .then(project => {
              res.render('../views/updateTask', {
                task: task,
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

router.get(baseURL + '/tasks/:id/tiedTask', function (req, res) {
  issueController.getAllIssues(req.params.projectID).then(issues => {
    projectController.getProject(req.params.projectID).then(project => {
      res.render('../views/tiedTask', {
        issueId: req.params.id,
        issues: issues,
        project: project
      }).catch(err => errorRoutes.pageNotFound(res, err))
    }).catch(err => errorRoutes.pageNotFound(res, err))
  }).catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/tasks/:id/linkTask', function (req, res) {
  taskController.linkToIssue(req, res)
  res.redirect('back')
})

router.post(baseURL + '/tasks/tiedTask', function (req, res) {
  taskController.createTask(req, res)
  res.redirect('/projects/' + req.params.projectID + '/issues')
})

router.post(baseURL + '/tasks/:id/update', function (req, res) {
  taskController.updateTask(req, res)
    .then(result => {
      res.redirect('/projects/' + req.params.projectID + '/tasks')
    })
})

router.post(baseURL + '/tasks/:id/delete', function (req, res) {
  taskController.deleteTask(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tasks')
})

module.exports = router
