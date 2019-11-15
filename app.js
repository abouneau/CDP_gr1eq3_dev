const express = require('express')
const bodyParser = require('body-parser')

const issue = require('./routes/issueRoute')
const log = require('./routes/logRoutes')
const task = require('./routes/taskRoutes')
const test = require('./routes/testRoutes')
const project = require('./routes/projectRoutes')
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', issue)
app.use('/', log)
app.use('/', task)
app.use('/', test)
app.use('/', project)

const port = 4321

app.listen(port, () => {
  console.log('Server is listenning on port ' + port)
})
