const express = require("express");
const photographyRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config
const {appointmentModel} = require("../models/appointment.model")
const authentication = require("../middleware/Authentication")
const {UserModel} = require("../models/user.model")
const {photoauth}=require("../middleware/photo.authantication")
const { photoModel } = require("../models/photographer.model");
const {authorise}=require("../middleware/Authorization.js")
photographyRouter.use(express.json());
require("dotenv").config()



// GET REQUEST
photographyRouter.get("/",async (req, res) => {
  const photo = await photoModel.find(req.query);
  res.send({ data: photo });
});

photographyRouter.get("/datass",(req,res)=>{
  res.send("dataaaas!")
})



photographyRouter.get("/:id",photoauth, async (req, res) => {
  const id = req.params.id;
  try {
    const photographer = await photoModel.findOne({_id: id});
    if (!photographer) {
      res.status(400).send({ "message": "Photographer not found" });
      return;
    }
    res.send({ data: photographer });
  } catch (error) {
    console.error(error);
    res.status(500).send({ "message": "Server Error" });
  }
});

photographyRouter.get("/:id/occasion", async (req, res) => {
  try {
    const photographerId = req.params.id;
    const photographer = await photoModel.findById(photographerId);
    const occasionData = photographer.occasion;
    res.send({ data: occasionData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server Error" });
  }
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
            const token = jwt.sign({userID : user._id,role: user.role},process.env.secretone, {expiresIn : "60m"})
            const refresh_token = jwt.sign({userID : user._id},process.env.secretwo, {expiresIn : "1d"})
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
photographyRouter.delete("/delete/:id",photoauth, async (req, res) => {
  const photoid = req.params.id;
  await photoModel.findByIdAndDelete({ _id: photoid });
  res.send("Deleted the note");
});


// PATCH REQUEST
photographyRouter.patch("/update/:id",photoauth, async (req, res) => {
  let Id = req.params.id;
  const payload = req.body;
  // console.log(payload)
  try {
    const photo = await photoModel.findByIdAndUpdate({ _id: Id }, payload);
   return res.send({ msg: "Details updated" ,payload});
  } catch (err) {
    return res.status(400).send(err.message)
  }
});

//assending sort low to high
photographyRouter.get("/low", async (req, res) => {
  const photo = await photoModel.find().sort({ charges: 1 });
  res.send({ msg: "photo", data: photo });
});

//desending sort high to low

photographyRouter.get('/high', async (req, res) => {
    const photo = await photoModel.find().sort({ "charges": -1 })
    res.send({ msg: 'photo', data: photo })
})


//search by hotel
photographyRouter.get("/search", async (req, res) => {
  const { location } = req.query;
  try {
    const photos = await photoModel.find({
      location: { $regex: `${location}`, $options: "i" },
    });
    res.send({ msg: "photographer", data: photos });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
photographyRouter.patch("/update/:id/occasions/:occasionName/slots/:slotTime", async (req, res) => {
  const photoId = req.params.id;
  const occasionName = req.params.occasionName;
  const slotTime = req.params.slotTime;
  const update = { $set: { [`occasion.$[occasion].slots.$[slot].booked`]: true } };
  const options = { arrayFilters: [{ "occasion.name": occasionName }, { "slot.time": slotTime }] };
  
  try {
    const photo = await photoModel.findByIdAndUpdate(photoId, update, options);
    console.log(photo);
    res.send({ msg: "Slot booked successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});
//unbook
photographyRouter.patch("/:id/occasion/:occasionId/slot/:slotId", async (req, res) => {
  const photographerId = req.params.id;
  const occasionId = req.params.occasionId;
  const slotId = req.params.slotId;

  try {
    const photographer = await photoModel.findById(photographerId);
    const occasion = photographer.occasion.id(occasionId);
    const slot = occasion.slots.id(slotId);
    slot.booked = false;
    await photographer.save();
    res.send({ message: 'Slot unbooked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});



module.exports = { photographyRouter };
