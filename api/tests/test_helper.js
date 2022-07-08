const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "My first blog",
    author: "flportilla",
    url: "localhost, somewhere",
    likes: 20210918,
  },
  {
    title: "My second blog",
    author: "flportilla",
    url: "here, somewhere",
    likes: 20220708,
  },
  {
    title: "My third blog",
    author: "flportilla",
    url: "here, somewhere",
    likes: 20220708,
  },

]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}