const express = require('express')
const router = express.Router()

const testController = require('../controllers/testController')

router.get('/test', testController.getTestPage)

router.get('/test/addTest', testController.getAddPage)

router.get('/test/updateTest', testController.getUpdatePage)

router.post('/test/addTest', testController.createTest)

router.post('/test/updateTest', testController.updateTest)

router.post('/test/deleteTest', testController.deleteTest)

module.exports = router
