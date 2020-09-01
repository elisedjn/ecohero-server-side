const { Schema, model } = require('mongoose');


const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  members: String
})




module.exports = model("Group", GroupSchema)