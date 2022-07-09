const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/users');

//create a new user
usersRouter.post('/', async (request, response) => {

  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  if (!username || !password) {
    return response.status(400).json({
      error: 'username or password is missing'
    })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be longer that 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

//Show all users withputh passwords
usersRouter.get('/', async (request, response) => {

  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })

  const usersInfo = users.map(user => {

    const { name, username, id, blogs } = user

    const userInfo = {
      username,
      name,
      id,
      blogs
    }
    return userInfo
  })

  response.json(usersInfo)
})

//show all info for one user ---- delete after finish ----
usersRouter.get('/:id', async (request, response) => {
  const user = await User.find({ id: request.body.id })
  response.json(user)
})

module.exports = usersRouter