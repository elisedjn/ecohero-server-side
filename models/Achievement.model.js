const { Schema, model } = require('mongoose');


const AchievementSchema = new Schema({
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "Challenge"
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  image: String,  //URL to Cloudinary
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  starting_date: {
    type: Date,
    default: Date.now()
  },
  finishing_date: Date,

})



module.exports = model('Achievement', AchievementSchema);