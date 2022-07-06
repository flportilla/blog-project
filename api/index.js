const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const [, , password] = process.argv

const mongoUrl = `mongodb+srv://flportilla:${password}@phonebookdb.ajsn5tf.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongoUrl)

app.use(cors());
app.use(express.json())

app.get('/api/blogs', async (request, response) => {

  const reviews = await Blog.find({})
  console.log(`all reviews: ${reviews}`)

  response.json(reviews)
})

app.post('/api/blogs', (request, response, next) => {
  const newBlog = new Blog(request.body)

  const result = newBlog
    .save()
    .then(blog => {
      if (blog) {
        response.json(blog)
      }

    })
    .catch(error => {
      console.log(error)
      console.log('data type incorrect, check POST request body')
      response.status(401).end()
    })

})

app.delete('/api/blogs', async (request, response, next) => {

  const deleteAll = await Blog.deleteMany({})
  response.status(200).end()

})


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})