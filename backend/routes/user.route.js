const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createClient } = require("redis");
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
const { UserModel } = require("../models/user.model");
UserRoute = express.Router();
const authentication = require("../middleware/Authentication")
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
  const user = await UserModel.findOne({email})
  if(!user){
      res.status(400).send({"msg":"Register first"})
      return
  }
  const hashedpwd = user?.password
  bcrypt.compare(password, hashedpwd, function(err, result) {
      if(result){
          const token = jwt.sign({userid : user._id, role : user.role}, process.env.secretKey, {expiresIn : "180m"})
          client.set("token",token)
          res.cookie("Token",token)
          const refresh_token = jwt.sign({userid : user._id, role:user.role},process.env.secretone, {expiresIn : "640m"})
          res.send({msg : "login successfull", token, user, refresh_token})
        }
        else{
          res.status(400).send({"msg":"Wrong credentials"})
        }
      });
    });
    

UserRoute.delete("/delete/:id",async(req,res)=>{
  const id = req.params.id
  try {
  await UserModel.findByIdAndDelete({_id:id})
  res.send("deleted user data")
  
  } catch (error) {
      console.log(error)
      res.send("somthing went wrong")
  }
})

module.exports = {
  UserRoute,
};
