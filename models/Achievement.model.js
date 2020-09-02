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
  image: {
    type:String, 
    default: 'https://res.cloudinary.com/diwwshnym/image/upload/v1598962686/ecohero_logo_tqx7jk.png'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group"
  },
  starting_date: {
    type: Date,
    default: Date.now()
  },
  finishing_date: Date,

})



module.exports = model('Achievement', AchievementSchema);