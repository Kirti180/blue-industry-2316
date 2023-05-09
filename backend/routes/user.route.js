const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createClient } = require("redis");
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
const { UserModel } = require("../models/user.model");
UserRoute = express.Router();
UserRoute.use(express.json());
require("dotenv").config()

const { appointmentModel } = require("../models/appointment.model");

UserRoute.post("/signup", async (req, res) => {
  let Role = req.body.role;
  req.body.role == undefined ? (Role = "User") : Role == req.body.role;
  const { firstName, lastName, mobileNo, email, password, role } = req.body;
  console.log(req.body);
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const users = new UserModel({
          firstName,
          lastName,
          mobileNo,
          email,
          password: hash,
          role,
        });
        await users.save();
        res.send({ msg: "New user registered", users });
      }
    });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error });
  }
});

UserRoute.post("/login", async (req, res) => {

  const { email, password } = req.body;
  res.clearCookie("token");
  try {
    const usr = await UserModel.find({ email });
    if (usr.length > 0) {
      bcrypt.compare(password, usr[0].password, async (err, result) => {
        if (result === true) {
          const token = jwt.sign({ userId: usr[0]._id }, process.env.secretKey, {
            expiresIn: "1h",
          });
          client.set("token", token);
          res.send({ msg: "User logged in successful", token: token, usr });
        } else if (result === false) {
          res.send({ msg: "Wrong password" });
        } else {
          res.send(err.message);
          if (err) res.send(err);
          else if (result) {
            const token = jwt.sign({ userId: usr[0]._id }, process.env.secretKey, {
              expiresIn: "10h"
            });
            res
              .cookie("Token", token)
              .send({ msg: "User logged in successful", token: token });
          }
        }
      });
    } else {
      res.send("Register first!");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  UserRoute,
};
