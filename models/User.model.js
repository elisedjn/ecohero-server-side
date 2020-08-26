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
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    //default: https:A default picture image already in Cloudinary 
  },
  points: {
    type: Number,
    default: 0
  },
  rank: {
    type: String,
    enum: ["New Hero", "Chill Hero", "Smart Hero", "Big Hero", "Super Hero"],
    default: "New Hero"
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Achievement"
  }]
})




module.exports = model("User", UserSchema)