
function totalLikes(blogs) {

  if (blogs.length === 0) return 0

  return blogs.reduce((prev, curr) => {
    return prev + curr.likes
  }, 0)
}

function mostLiked(blogs) {
  if (blogs.length === 0) return 0

  const maxLikes = blogs.reduce((prev, curr) => {
    return Math.max(prev, curr.likes);
  }, 0)

  const mostLikedBlog = blogs.filter(blog => blog.likes === maxLikes)

  const result = {
    title: mostLikedBlog[0].title,
    author: mostLikedBlog[0].author,
    likes: mostLikedBlog[0].likes
  }

  return result
}

function mostBlogs(blogs) {

}

module.exports = {
  totalLikes,
  mostLiked,
  mostBlogs
}