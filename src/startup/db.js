const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose.connect("mongodb://localhost/new_db" ,  { useNewUrlParser: true } ).then((result) => {
    winston.info("Connection to MongoDB .. " + result.Error);
  });
};
