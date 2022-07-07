const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// GET all blogs
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

// GET one blog by id
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// POST a new blog
blogsRouter.post('/', (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  blog.save()
    .then(savedblog => {
      response.json(savedblog)
    })
    .catch(error => next(error))
})

// DELETE a blog by id
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter