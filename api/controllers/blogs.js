const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

// GET all blogs
blogsRouter.get('/', async (request, response, next) => {
  const allBlogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(allBlogs)
})

// GET one blog by id
blogsRouter.get('/:id', async (request, response, next) => {

  const oneBlog = await Blog.findById(request.params.id)
  console.log(oneBlog)
  response.json(oneBlog)
})

// POST a new blog
blogsRouter.post('/', async (request, response, next) => {

  const { title, author, url, likes } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

// DELETE a blog by id
blogsRouter.delete('/:id', async (request, response, next) => {

  const selectedBlog = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blogInUser = user?.blogs.filter(blog => blog.toString() === selectedBlog?.id)

  if (blogInUser?.toString() === selectedBlog?.id) {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  response.status(401).end()
})

// Update a blog by id
blogsRouter.put('/:id', async (request, response, next) => {
  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedPost)
})

module.exports = blogsRouter