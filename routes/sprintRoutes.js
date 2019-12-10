const express = require('express')
const router = express.Router()

const sprintController = require('../controllers/sprintController')
const projectController = require('../controllers/projectController')
const issueController = require('../controllers/issueController')
const taskController = require('../controllers/taskController')
const errorRoutes = require('./errorRoutes')

const baseURL = '/projects/:projectID'

router.get(baseURL + '/sprints', function (req, res) {
  sprintController.getAllSprints(req.params.projectID)
    .then(sprints => {
      issueController.getAllIssues(req.params.projectID)
        .then(issues => {
          sprintController.updateAllSprintLinkedIssue(sprints, req.params.projectID)
          sprintController.updateAllSprintState(sprints, req.params.projectID)
          projectController.getProject(req.params.projectID)
            .then(project => {
              res.render('../views/sprints', {
                sprints: sprints,
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

router.get(baseURL + '/sprints/create', function (req, res) {
  issueController.getAllIssues(req.params.projectID)
    .then(issues => {
      projectController.getProject(req.params.projectID)
        .then(project => {
          res.render('../views/createSprint', {
            issues: issues,
            project: project
          })
        })
        .catch(err => errorRoutes.pageNotFound(res, err))
    })
    .catch(err => errorRoutes.pageNotFound(res, err))
})

router.get(baseURL + '/sprints/:id', function (req, res) {
  issueController.getAllIssues(req.params.projectID)
    .then(allIssues => {
      taskController.getAllTasks(req.params.projectID)
        .then(allTasks => {
          sprintController.getIssueListOfSprint(req.params.id)
            .then(issues => {
              projectController.getProject(req.params.projectID)
                .then(project => {
                  const issuesTaskList = []
                  let wait = 0
                  if (issues.length === 0) {
                    sprintController.getSprint(req.params.id)
                      .then(sprint => {
                        res.render('../views/sprint', {
                          sprint: sprint,
                          issues: issues,
                          tasks: allTasks,
                          allIssues: allIssues,
                          issuesTaskList: issuesTaskList,
                          project: project
                        })
                      })
                  } else {
                    for (const issue of issues) {
                      issueController.getTaskLinked(issue._id)
                        .then(tasks => {
                          issuesTaskList[issue._id] = tasks
                          ++wait
                          if (wait >= issues.length) {
                            sprintController.getSprint(req.params.id)
                              .then(sprint => {
                                res.render('../views/sprint', {
                                  sprint: sprint,
                                  issues: issues,
                                  tasks: allTasks,
                                  allIssues: allIssues,
                                  issuesTaskList: issuesTaskList,
                                  project: project
                                })
                              })
                          }
                        })
                    }
                  }
                })
            })
        })
    })
})

router.get(baseURL + '/sprints/:id/update', function (req, res) {
  sprintController.getSprint(req.params.id)
    .then(sprint => {
      issueController.getAllIssues(req.params.projectID)
        .then(issues => {
          projectController.getProject(req.params.projectID)
            .then(project => {
              res.render('../views/updateSprint', {
                sprint: sprint,
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

router.post(baseURL + '/sprints/create', function (req, res) {
  sprintController.createSprint(req, res)
  res.redirect('/projects/' + req.params.projectID + '/sprints')
})

router.post(baseURL + '/sprints/:id/linkIssue', function (req, res) {
  sprintController.linkToIssue(req, res)
    .then(result => {
      res.redirect('/projects/' + req.params.projectID + '/sprints')
    })
})

router.post(baseURL + '/sprints/:id/update', function (req, res) {
  sprintController.updateSprint(req, res)
    .then(result => {
      res.redirect('back')
    })
})

router.post(baseURL + '/sprints/:id/delete', function (req, res) {
  sprintController.deleteSprint(req, res)
  res.redirect('/projects/' + req.params.projectID + '/sprints')
})

module.exports = router
