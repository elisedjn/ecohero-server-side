const { Schema, model } = require('mongoose');


const AchievementSchema = new Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge"
  },
  completed: {
    type: Boolean,
    required: true
  },
  image: String,  //URL to Cloudinary
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  starting_date: {
    type: Date,
    default: Date.now()
  },
  finishing_date: Date,

})



module.exports = model('Achievement', AchievementSchema);