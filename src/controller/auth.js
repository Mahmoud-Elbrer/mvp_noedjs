const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const { validateSignIn, validateSignUp }  = require("../validations/validations");

exports.signIn = async (req, res, next) => {
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
};

exports.signUp = async function (req, res, next) {


  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exists");

  user = User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

  const salt = await bcrypt.genSalt(10); //  10 it default value
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
};

exports.testMessage = function (req, res) {
  console.log("Hello Boy");
};
