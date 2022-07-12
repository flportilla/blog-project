const express = require('express')
const cors = require('cors')
require('express-async-errors')
const app = express()

const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')


const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app