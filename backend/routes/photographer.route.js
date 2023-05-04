const express = require("express");
const photographyRouter = express.Router();

const { photoModel } = require("../models/photographer.model");
photographyRouter.use(express.json());
// GET REQUEST
photographyRouter.get("/", async (req, res) => {
  const photo = await photoModel.find(req.query);
  res.send({ data: photo });
});
// POST REQUEST
photographyRouter.post("/create", async (req, res) => {
  // res.send("notes created")
  const photo = new photoModel(req.body);
  await photo.save();
  res.send({ data: "photography created" });
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
photographyRouter.get("/low", async (req, res) => {
  const photo = await photoModel.find().sort({ charges: 1 });
  res.send({ msg: "photo", data: photo });
});

//desending sort high to low
photographyRouter.get("/high", async (req, res) => {
  const photo = await photoModel.find().sort({ charges: -1 });
  res.send({ msg: "photo", data: photo });
});
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



module.exports = { photographyRouter };
