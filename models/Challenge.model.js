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
  },
  status: {
    type: String,
    enum: ["individual", "group"],
    default: "individual"
  }
})


module.exports = model('Challenge', ChallengeSchema);