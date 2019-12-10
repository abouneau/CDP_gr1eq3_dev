const express = require('express')
const router = express.Router()

const releaseController = require('../controllers/releaseController')
const projectController = require('../controllers/projectController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

router.get(baseURL + '/releases', function (req, res) {
  releaseController.getAllReleases(req.params.projectID)
    .then(releases => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/releases', {
            releases: releases,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.get(baseURL + '/releases/show/:id', function (req, res) {
  releaseController.getIssueListOfRelease(req.params.id)
    .then(issues => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          releaseController.getRelease(req.params.id)
            .then(release => {
              res.render('../views/release', {
                release: release,
                issues: issues,
                project: project
              })
            })
        })
    })
})

router.get(baseURL + '/releases/create', function (req, res) {
  projectController.getProject(req.params.projectID)
    .then(project => {
      res.render('../views/createRelease', {
        project: project
      })
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.post(baseURL + '/releases/create', function (req, res) {
  releaseController.createRelease(req, res)
  res.redirect('/projects/' + req.params.projectID + '/releases')
})

module.exports = router
