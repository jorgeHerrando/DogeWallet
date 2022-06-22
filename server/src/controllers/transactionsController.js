const createToken = require("../helpers/createToken");

const UserModel = require("../models/User");
const { validationResult } = require("express-validator");

const apiTransactionsController = {
  addMoney: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.user.email });
      const { address, amount } = req.body;

      // if user found and address matches
      if (user && user.addressDoge === address) {
        console.log(Date.now());
        // add transaction to user
        user.transactions.push({
          amount,
          date: Date.now(),
        });
        // save user
        await user.save();
        // send response
        return res.status(200).json({
          message: "Successful transaction",
          transactions: user.transactions,
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

module.exports = apiTransactionsController;
