const Task = require('../models/taskModel')
const dbconnect = require('../database/dbconnect')

exports.createTask = function (req, res) {
    const task = new Task(
        req.body.id,
        req.body.description,
        req.body.estimatedTime,
        req.body.dependencies,
        req.body.linkedUserStories,
        req.body.advancementState,
        req.body.assignedDeveloper
    )

    collection = dbconnect.client.db('Projet1').collection('tasks')
    dbconnect.addElementToDB(task, collection, "Task added successfully.")

    res.send('Task Created')
}

exports.getTask = function (req, res) {
    const taskToFind = {'_id' : req.params.id}
    collection = dbconnect.client.db('Projet1').collection('tasks')

    dbconnect.findElementInDB(taskToFind, collection)
    .then (task => {
        console.log(task)
        res.send(task)
    })
}

exports.updateTask = function (req, res) {
    const taskToUpdate = {'_id' : req.params.id}
    const updatedTask = {
        '_id' : req.body.id,
        '_description' : req.body.description,
        '_estimatedTime' : req.body.estimatedTime,
        '_dependencies' : req.body.dependencies,
        '_linkedUserStories' : req.body.linkedUserStories,
        '_advancementState' : req.body.advancementState,
        '_assignedDeveloper' : req.body.assignedDeveloper
    }

    collection = dbconnect.client.db('Projet1').collection('tasks')

    dbconnect.updateElementInDB(taskToUpdate, updatedTask, collection, 'Task updated')

    res.send('Task Updated')
}

exports.deleteTask = function (req, res) {
    const taskToDelete = {'_id' : req.params.id}
    collection = dbconnect.client.db('Projet1').collection('tasks')

    dbconnect.deleteElementFromDB(taskToDelete, collection, 'task deleted')

    res.send('Task Deleted')
}