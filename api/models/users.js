const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const { _id, __v, ...rest } = returnedObject
    return { id: _id.toString(), ...rest }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User