const Test = require('../models/testModel')
const dbconnect = require('../database/dbconnect')
const logController = require('../controllers/logController')
const { ObjectId } = require('mongodb')

function getTestPage (req, res) {
  const collection = dbconnect.client.db('Projet1').collection('tests')
  dbconnect.getWholeCollection(collection)
    .then(tests => {
      res.render('../views/test.ejs', { tests: tests, user: logController.userConnected })
    }
    )
}

function getAddPage (req, res) {
  console.log('get')
  res.render('../views/addTest.ejs', { user: logController.userConnected })
}

function getUpdatePage (req, res) {
  const id = req.query.id
  if (!id) {
    throw (new Error('id parameter is required'))
  }
  const query = { _id: ObjectId(id) }
  const collection = dbconnect.client.db('Projet1').collection('tests')
  dbconnect.findElementInDB(query, collection, 'element find', 'element not find')
    .then(element => {
      res.render('../views/updateTest.ejs', { test: element, id: id, user: logController.userConnected })
    })
    .catch(e => res.send(e.message))
}

function createTest (req, res) {
  const test = new Test(
    req.body.name,
    req.body.description
  )

  const collection = dbconnect.client.db('Projet1').collection('tests')
  dbconnect.addElementToDB(test, collection, 'Test added successfully.')
  res.redirect('/test')
};

function updateTest (req, res) {
  const testToUpdate = { _id: ObjectId(req.body.id) }

  const updatedTest = {
    _id: ObjectId(req.body.id),
    _name: req.body.name,
    _description: req.body.description
  }
  console.log(updatedTest)
  console.log(testToUpdate)

  const collection = dbconnect.client.db('Projet1').collection('tests')

  dbconnect.updateElementInDB(testToUpdate, updatedTest, collection, 'Test updated')
  res.redirect('/test')
};

function deleteTest (req, res) {
  const testToDelete = { _id: ObjectId(req.body.id) }
  const collection = dbconnect.client.db('Projet1').collection('tests')

  dbconnect.deleteElementFromDB(testToDelete, collection, 'Test deleted')
  res.redirect('/test')
};

module.exports = {
  getTestPage,
  getAddPage,
  getUpdatePage,
  createTest,
  updateTest,
  deleteTest
}
