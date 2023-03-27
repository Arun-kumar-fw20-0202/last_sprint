const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());
var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv");

// Register
userRouter.post("/register", async (req, res) => {
  const { email, password, name, gender, age, city, is_married } = req.body;
  // console.log(email);
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await user.save();
      res
        .status(200)
        .send({ msg: "Registration has been successfully registered" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
// Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            mgs: "Login Successful!!",
            token: jwt.sign({ userID: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "wrong Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
module.exports = { userRouter };
