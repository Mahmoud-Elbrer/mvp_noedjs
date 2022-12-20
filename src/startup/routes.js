var authRouter = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/api", authRouter);
  app.use(error);
};
