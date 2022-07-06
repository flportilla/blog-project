
function totalLikes(blogs) {

  if (blogs.length === 0) return 0

  return blogs.reduce((prev, curr) => {
    return prev + curr.likes
  }, 0)
}

module.exports = {
  totalLikes,
}