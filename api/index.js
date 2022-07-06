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

app.post('/api/blogs', async (request, response) => {
  const newBlog = new Blog(request.body)
  const result = await newBlog.save()
  console.log(`succesfully added: ${result} to MongoDB`)
  response.status(201).json(result)
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})