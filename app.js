const express = require('express')
const bodyParser = require('body-parser')

const task = require('./routes/taskRoutes')
const issue = require('./routes/issueRoute')
const log = require('./routes/logRoutes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))

app.use('/', issue)
app.use('/', log)
app.use('/tasks', task)



let port = 4321

app.listen(port, () => {
    console.log('Server is listenning on port ' + port )
})