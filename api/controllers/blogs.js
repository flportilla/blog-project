const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

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

  const user = await User.findById(request.body.userId)


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
  console.log(savedBlog.id)

  response.status(201).json(savedBlog)
})

// DELETE a blog by id
blogsRouter.delete('/:id', async (request, response, next) => {

  const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


//DELETE ALL
blogsRouter.delete('/', async (request, response, next) => {
  const deletedBlog = await Blog.deleteMany({})
  response.status(204).end()
})

// Update a blog by id
blogsRouter.put('/:id', async (request, response, next) => {
  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedPost)
})

module.exports = blogsRouter