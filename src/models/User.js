const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  age: String,
  phone: String,
  gender: String,
});

const SignUpModel = mongoose.model("UserSignup", signUpSchema);

module.exports = {
  SignUpModel,
};
