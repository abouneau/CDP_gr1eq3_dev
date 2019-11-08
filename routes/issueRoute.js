const express = require('express')
const router = express.Router()

const issueController = require('../controllers/issueController')

router.get('/', issueController.getBacklogPage)

router.get('/addIssue', issueController.getAddPage)

router.get('/updateIssue', issueController.getUpdatePage)

router.post('/addIssue', issueController.createIssue)

router.post('/updateIssue', issueController.updateIssue)

router.post('/deleteIssue', issueController.deleteIssue)

module.exports = router
