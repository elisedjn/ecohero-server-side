const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/diwwshnym/image/upload/v1598962686/ecohero_logo_tqx7jk.png'
  },
  points: {
    type: Number,
    default: 0
  },
  rank: {
    type: String,
    enum: ["New Hero", "Chill Hero", "Smart Hero", "Big Hero", "Super Hero"],
    default: "New Hero"
  }
})




module.exports = model("User", UserSchema)