const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 1024,
  },
  isAdmin: Boolean,
});

// information export principle : oop

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey"),
    { expiresIn: "1 days" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);



exports.User = User;

