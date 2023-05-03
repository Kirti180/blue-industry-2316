const express = require("express");
const photographyRouter = express.Router();

const { photoModel } = require("../models/photographer.model");
photographyRouter.use(express.json());
// GET REQUEST
photographyRouter.get("/photography", async (req, res) => {
  const photo = await photoModel.find(req.query);
  res.send({ data: photo });
});
// POST REQUEST
photographyRouter.post("/photography/create", async (req, res) => {
  // res.send("notes created")
  const photo = new photoModel(req.body);
  await photo.save();
  res.send({ data: "note created" });
});
// DELETE REQUEST
photographyRouter.delete("/photography/delete/:id", async (req, res) => {
  const photoid = req.params.id;
  await photoModel.findByIdAndDelete({ _id: photoid });
  res.send("Deleted the note");
});
// PATCH REQUEST
photographyRouter.patch("/photography/update/:id", async (req, res) => {
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
module.exports = { photographyRouter };
