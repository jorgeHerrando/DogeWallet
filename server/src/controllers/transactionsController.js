const createToken = require("../helpers/createToken");

const UserModel = require("../models/User");
const { validationResult } = require("express-validator");

const apiTransactionsController = {
  addMoney: async (req, res) => {
    try {
      const user = await UserModel.findOne({ addressDoge: req.body.address });
      const { address, amount } = req.body;
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];

      // if user found and address matches
      if (user && user.addressDoge === address) {
        // add transaction to user
        user.transactions.push({
          amount: Number(amount),
          date: Date.now(),
        });
        // add money tu user
        user.balance = user.balance + Number(amount);
        // save user
        await user.save();
        // send response
        return res.status(200).json({
          message: "Successful transaction",
          user: {
            username: user.name,
            address: user.addressDoge,
            balance: user.balance,
            transactions: user.transactions,
            accessToken: token,
          },
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
