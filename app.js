const express = require('express')
const bodyParser = require('body-parser')

const task = require('./routes/taskRoutes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))

app.use('/', task)

let port = 4848

app.listen(port, () => {
    console.log('Server is listenning on port ' + port )
})