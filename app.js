const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const issue = require('./routes/issueRoutes')
const log = require('./routes/logRoutes')
const task = require('./routes/taskRoutes')
const test = require('./routes/testRoutes')
const project = require('./routes/projectRoutes')
const sprint = require('./routes/sprintRoutes')
const release = require('./routes/releaseRoutes')
const app = express()

app.set('view engine', 'ejs')

app.use('/scripts', express.static('scripts'))
app.use('/styles', express.static('styles'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/scss', express.static('scss'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'sosecret',
  saveUninitialized: false,
  resave: false
}))

app.use(function (req, res, next) {
  if (req.originalUrl === '/signIn') {
    res.locals.user = req.session.user
    next()
  } else {
    if (req.session.user === undefined && req.originalUrl !== '/signUp') {
      res.render('signIn')
    } else {
      res.locals.user = req.session.user
      next()
    }
  }
})

app.use('/', issue)
app.use('/', log)
app.use('/', task)
app.use('/', test)
app.use('/', project)
app.use('/', sprint)
app.use('/', release)

app.get('/pageNotFound', function (req, res) {
  res.render('pageNotFound')
})

app.use(function (req, res) {
  res.redirect('/pageNotFound')
})

const port = 4321

app.listen(port, () => {
  console.log('Server is listenning on port ' + port)
})
