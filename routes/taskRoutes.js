const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')

router.get('/:id', taskController.getTask)

router.post('/create', taskController.createTask)

router.put('/:id/update', taskController.updateTask)

router.delete('/:id/delete', taskController.deleteTask)



module.exports = router