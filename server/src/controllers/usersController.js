const createToken = require("../helpers/createToken");

const UserModel = require("../models/User");
const { validationResult } = require("express-validator");

const apiUsersController = {
  // process the login form
  login: async (req, res) => {
    try {
      const resultValidation = validationResult(req);

      // check if there are errors in the validation
      if (resultValidation.errors.length > 0) {
        return res.status(400).json({
          errors: resultValidation.mapped(),
        });
      }

      // we get the data from the login form
      const { email, password } = req.body;

      // we search for the user in the DB
      const user = await UserModel.findOne({ email, password });

      // if the user doesn't exist we send an error
      if (user) {
        // Generate jwt token
        const accessToken = createToken({
          username: user.name,
          email: user.email,
          transactions: user.transactions,
        });
        // we send the token with some data to the client
        return res.status(200).json({
          message: "Login successful",
          username: user.name,
          transactions: user.transactions,
          accessToken,
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = apiUsersController;
