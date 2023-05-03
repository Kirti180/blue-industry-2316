const mongoose = require("mongoose");
photo = mongoose.Schema({
  title: String,
  image: String,
  occasion: Object,
  address: String,
  charges: Number,
  location: String,
  workingtime: String,
  contact: String,
});
photoModel = mongoose.model("Photographer", photo);
module.exports = { photoModel };
