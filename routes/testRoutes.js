const express = require('express')
const router = express.Router()

const testController = require('../controllers/testController')
const projectController = require('../controllers/projectController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

// if the test id doesn't belong to project with id projectID, redirect to pageNotFound
router.get(baseURL + '/tests/:id/*', function (req, res, next) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      testController.getTest(req.params.id)
        .then(test => {
          if (JSON.stringify(project._id) !== JSON.stringify(test._projectID)) {
            res.redirect('pageNotFound')
          }
        })
      next()
    })
})

router.get(baseURL + '/tests', function (req, res) {
  testController.getAllTests(req.params.projectID)
    .then(tests => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/tests', {
            tests: tests,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.get(baseURL + '/tests/create', function (req, res) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      res.render('../views/createTest', {
        project: project
      })
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

// router.get(baseURL + '/tests/:id', function (req, res) {
//   testController.getTest(req.params.id)
//     .then(test => {
//       console.log(test._name)
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect('/pageNotFound')
//     })
// })

router.get(baseURL + '/tests/:id/update', function (req, res) {
  testController.getTest(req.params.id)
    .then(test => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/updateTest', {
            test: test,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/tests/create', function (req, res) {
  testController.createTest(req, res)
    .then(result => {
      res.redirect('/projects/' + req.params.projectID + '/tests')
    })
})

router.post(baseURL + '/tests/:id/update', function (req, res) {
  testController.updateTest(req, res)
    .then(result => {
      res.redirect('/projects/' + req.params.projectID + '/tests')
    })
})

router.post(baseURL + '/tests/:id/delete', function (req, res) {
  testController.deleteTest(req, res)
  res.redirect('/projects/' + req.params.projectID + '/tests')
})

module.exports = router
