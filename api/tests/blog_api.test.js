const mongoose = require('mongoose')
const config = require('../utils/config')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 1000000)

test('all blogs are returned', async () => {

  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 1000000)


test('the id property is called id instead of _id', async () => {

  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()

}, 1000000)

test('a valid blog can be added ', async () => {
  const newBlog = {
    "title": "async/await simplifies making async calls",
    "author": "flportilla",
    "url": "localhost, somewhere",
    "likes": 20210918
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(
    'async/await simplifies making async calls')
}, 100000)


afterAll(() => {
  mongoose.connection.close()
})