const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', async (request, response, next) => {

  const allBlogs = await Blog.find({})
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

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// DELETE a blog by id
blogsRouter.delete('/:id', async (request, response, next) => {

  const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter