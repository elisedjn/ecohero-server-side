const { Schema, model } = require('mongoose');


const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  challenge:{
    type: Schema.Types.ObjectId,
    ref: "Challenge"
  },
  finished:{
    type: Boolean,
    default: false
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  image: {
    type:String, 
    default: 'https://res.cloudinary.com/diwwshnym/image/upload/v1598962686/ecohero_logo_tqx7jk.png'
  },
})




module.exports = model("Group", GroupSchema)