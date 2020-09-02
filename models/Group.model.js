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
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
})




module.exports = model("Group", GroupSchema)