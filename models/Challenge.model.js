const { Schema, model } = require('mongoose');


const ChallengeSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  points: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})


module.exports = model('Challenge', ChallengeSchema);