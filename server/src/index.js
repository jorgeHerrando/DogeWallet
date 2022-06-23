// to be able to read .env variables
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");

const usersRoutes = require("./routes/usersRouter");
const transactionsRoutes = require("./routes/transactionsRouter");

mongoose.connect(
  //.env?
  "mongodb+srv://userDoge:passwordDoge@dogecluster.xdd54.mongodb.net/DogeWallet?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: "Havenboards",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
