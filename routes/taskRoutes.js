const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const logControler = require('../controllers/logController')

router.get('/tasks', function (req, res) {
  taskController.getAllTasks()
    .then(tasks => {
      res.render('../views/tasks', { tasks: tasks, user: logControler.userConnected })
    })
})

router.get('/tasks/create', function (req, res) {
  res.render('../views/createTask', { taskExists: taskController.taskExists, user: logControler.userConnected })
})

router.post('/tasks/create', function (req, res) {
  taskController.createTask(req, res)
  res.redirect('/tasks')
})

router.get('/tasks/:id', taskController.getTask)

router.get('/tasks/:id/update', function (req, res) {
  taskController.getTask(req, res)
    .then(task => {
      res.render('../views/updateTask', { task: task, user: logControler.userConnected })
    })
})

router.post('/tasks/:id/update', function (req, res) {
  taskController.updateTask(req, res)
  res.redirect('/tasks')
})

router.post('/tasks/:id/delete', function (req, res) {
  taskController.deleteTask(req, res)
  res.redirect('/tasks')
})

module.exports = router
