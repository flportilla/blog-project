const { JsonWebTokenError } = require('jsonwebtoken')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

//Logs all the requests to the console
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

//Shows proper error message
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

//Extracts the token from the header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

//Extracts the user from the request
const userExtractor = async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor
}