const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  firstName: {
    type: String,
    reuired: true
  },
  lastName: {
    type: String,
    required: true
  }
})

const User = Mongoose.model("user", UserSchema)
module.exports = User