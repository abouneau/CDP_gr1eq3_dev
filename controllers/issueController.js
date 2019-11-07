const Issue = require('../models/issueModel')
const dbconnect = require('../database/dbconnect')

function getBacklogPage(req, res) {
  collection = dbconnect.client.db('Projet1').collection('issues')
  dbconnect.getWholeCollection(collection)
  .then( issues => {
          res.render("backlog.ejs", {issues: issues})
        }
  )
}

function getAddPage(req, res) {
  console.log("get")
  res.render('addIssue.ejs')
}

function getUpdatePage(req, res) {
  id = req.query.id;
  if (!id) {
      reject(new Error("id parameter is required"))
  }
  query = {_id: id}
  collection = dbconnect.client.db('Projet1').collection('issues')
  dbconnect.findElementInDB(query,collection,'element find', 'element not find')
  .then(element => {
      res.render('./updateIssue.ejs', {
              issue: element
          })
  })
  .catch(e =>res.send(e.message))
}

function createIssue(req, res) {
    const issue = new Issue(
        req.body.id,
        req.body.name,
        req.body.description,
        req.body.priority,
        req.body.difficulty
    )

    collection = dbconnect.client.db('Projet1').collection('issues')
    dbconnect.addElementToDB(issue, collection, "Issue added successfully.")
    
    res.redirect('/')
};

function updateIssue(req, res) {
    const issueToUpdate = {'_id' : req.params.id}

    const updatedIssue = {
        '_id' : req.body.id,
        '_name' : req.body.name,
        '_description' : req.body.description,
        '_priority' : req.body.priority,
        '_difficulty' : req.body.difficulty
    }

    collection = dbconnect.client.db('Projet1').collection('issues')

    dbconnect.updateElementInDB(issueToUpdate, updatedIssue, collection, 'Issue updated')

    res.redirect('/')
};

function deleteIssue(req, res) {
    const issueToDelete = {'_id' : req.body.id}
    collection = dbconnect.client.db('Projet1').collection('issues')

    dbconnect.deleteElementFromDB(issueToDelete, collection, 'issue deleted')

    res.redirect('/')
};

module.exports = {
  getBacklogPage,
  getAddPage,
  getUpdatePage,
  createIssue,
  updateIssue,
  deleteIssue
}