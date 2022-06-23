const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addressDoge: {
    type: String,
    required: true,
  },
  transactions: [
    {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
  balance: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
