const { Schema, model } = require('mongoose');


const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  fact: String,
  points: {
    type: Number,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})


module.exports = model('Challenge', ChallengeSchema);