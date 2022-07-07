const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs
blogsRouter.get('/', async (request, response, next) => {

  try {
    const allBlogs = await Blog.find({})
    response.json(allBlogs)
  } catch (error) {
    next(error)
  }

})

// GET one blog by id
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const oneBlog = await Blog.findById(request.params.id)
    console.log(oneBlog)
    response.json(oneBlog)
  }
  catch (error) {
    next(error)
  }
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

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  }
  catch (error) {
    next(error)
  }

})

// DELETE a blog by id
blogsRouter.delete('/:id', async (request, response, next) => {

  try {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  catch (error) {
    next(error)
  }
})

module.exports = blogsRouter