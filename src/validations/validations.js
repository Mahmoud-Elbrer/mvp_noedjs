const Joi = require("joi");

exports.validateSignUp = function(user){
    const schema = Joi.object({
        name: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        isAdmin: Joi.boolean().required(),
      });
      return schema.validate(user);
}


exports.validateSignIn = function(user){
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
      });
      return schema.validate(user);
}