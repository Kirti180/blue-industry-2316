const express = require("express");
const photographyRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config

const { photoModel } = require("../models/photographer.model");
photographyRouter.use(express.json());


// GET REQUEST
photographyRouter.get("/", async (req, res) => {
  const photo = await photoModel.find(req.query);
  res.send({ data: photo });
});


//login for photographer
photographyRouter.post("/login",async(req,res)=>{
  const {email, pass} = req.body;

    const user = await photoModel.findOne({email})
    console.log(user)
    if(!user){
        res.status(400).send("Please signup first")
        return
    }
    const hashedpwd = user?.pass
    bcrypt.compare(pass, hashedpwd, function(err, result) {
        if(result){
            const token = jwt.sign({userID : user._id},"onesecret", {expiresIn : "60m"})
            const refresh_token = jwt.sign({userID : user._id},"twosecret", {expiresIn : "1d"})
            res.send({msg : "login successfull", token, user, refresh_token})
        }
        else{
            res.status(400).send("login failed")
        }
    });
})


// POST REQUEST
photographyRouter.post("/create", async (req, res) => {
  // res.send("notes created")
    const { title,email,image,pass,role,occasion,address,charges,location,workingtime,contact } = req.body
    try {
        bcrypt.hash(pass, 4, async (err, hash) => {
            if (err) {
                res.status(400).send(err)
            }
            else {
                const photographer = new photoModel({ title,email,image,pass:hash,role,occasion,address,charges,location,workingtime,contact })
                await photographer.save()
                res.status(200).send({ "msg": "New photographer registered", photographer })
            }
        });
    } catch (error) {
        res.status(400).send({ "msg": "something went wrong", "error": error })
    }
});


// DELETE REQUEST
photographyRouter.delete("/delete/:id", async (req, res) => {
  const photoid = req.params.id;
  await photoModel.findByIdAndDelete({ _id: photoid });
  res.send("Deleted the note");
});


// PATCH REQUEST
photographyRouter.patch("/update/:id", async (req, res) => {
  let Id = req.params.id;
  const payload = req.body;
  // console.log(payload)
  try {
    const photo = await photoModel.findByIdAndUpdate({ _id: Id }, payload);
    console.log(photo);
    res.send({ msg: "patch req done" });
  } catch (err) {
    console.log(err);
  }
});

//assending sort low to high
photographyRouter.get('/low', async (req, res) => {
    const photo = await photoModel.find().sort({ "charges": 1 })
    res.send({ msg: 'photo', data: photo })
})

//desending sort high to low
photographyRouter.get('/high', async (req, res) => {
    const photo = await photoModel.find().sort({ "charges": -1 })
    res.send({ msg: 'photo', data: photo })
})

//search by hotel
photographyRouter.get("/search", async (req, res) => {
  const { location } = req.query;
  try {
      const photos = await photoModel.find({ location: { $regex: `${location}`, $options: "i" } });
      res.send({ msg: "photographer", data: photos });
  } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Internal Server Error" });
  }
});
module.exports = { photographyRouter };
